"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "motion/react";
import {
  activeStageRef,
  osmosisProgressRef,
  conversionProgressRef,
  molecularProgressRef,
  ionizationProgressRef,
  STORY_STAGE,
} from "@/components/3d/hooks/useScrollTimeline";

// Configuración de las 5 secuencias correspondientes a las fases
const SEQUENCES = {
  osmosis: { folder: "secuencia1", total: 300, key: "osmosis" },
  conversion: { folder: "secuencia2", total: 300, key: "conversion" },
  molecular: { folder: "secuencia4", total: 300, key: "molecular" },
  ionization1: { folder: "secuencia3", total: 300, key: "ionization1" }, // Primera mitad celular
  ionization2: { folder: "secuencia5", total: 240, key: "ionization2" }, // Segunda mitad celular
} as const;

type SequenceKey = keyof typeof SEQUENCES;

// Formatea el path de la imagen
function getFramePath(folder: string, frameIndex: number): string {
  const paddedFrame = String(frameIndex).padStart(3, "0");
  return `/assets/sequences/${folder}/ezgif-frame-${paddedFrame}.jpg`;
}

export function SequenceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  // Cache de imágenes cargadas: Map<Path, HTMLImageElement>
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());

  // Registro de descargas activas para control de concurrencia
  const activeDownloadsRef = useRef<Set<string>>(new Set());
  const downloadQueueRef = useRef<string[]>([]);
  const MAX_CONCURRENT_DOWNLOADS = 6;

  // Cola y ejecutor de descargas
  const processDownloadQueue = useCallback(() => {
    if (
      downloadQueueRef.current.length === 0 ||
      activeDownloadsRef.current.size >= MAX_CONCURRENT_DOWNLOADS
    ) {
      return;
    }

    while (
      activeDownloadsRef.current.size < MAX_CONCURRENT_DOWNLOADS &&
      downloadQueueRef.current.length > 0
    ) {
      const path = downloadQueueRef.current.shift();
      if (!path || imageCacheRef.current.has(path) || activeDownloadsRef.current.has(path)) {
        continue;
      }

      activeDownloadsRef.current.add(path);

      const img = new Image();
      img.src = path;
      img.onload = () => {
        imageCacheRef.current.set(path, img);
        activeDownloadsRef.current.delete(path);
        processDownloadQueue();
      };
      img.onerror = () => {
        activeDownloadsRef.current.delete(path);
        processDownloadQueue();
      };
    }
  }, []);

  // Solicita la carga de una imagen de manera no bloqueante
  const requestImageLoad = useCallback(
    (path: string, priority = false) => {
      if (imageCacheRef.current.has(path) || activeDownloadsRef.current.has(path)) {
        return;
      }

      if (priority) {
        // Si tiene prioridad, lo agregamos al principio de la cola si no está ya
        const index = downloadQueueRef.current.indexOf(path);
        if (index > -1) {
          downloadQueueRef.current.splice(index, 1);
        }
        downloadQueueRef.current.unshift(path);
      } else {
        if (!downloadQueueRef.current.includes(path)) {
          downloadQueueRef.current.push(path);
        }
      }

      processDownloadQueue();
    },
    [processDownloadQueue],
  );

  // Pre-carga los primeros N frames de cada secuencia para que no haya parpadeos al hacer scroll rápido
  const preloadInitialFrames = useCallback(() => {
    const INITIAL_FRAMES_TO_PRELOAD = 30;

    // Fases y carpetas
    const sequences = Object.values(SEQUENCES);

    // Primero encolamos los primeros 5 frames de cada secuencia con prioridad
    for (let f = 1; f <= 5; f++) {
      sequences.forEach((seq) => {
        requestImageLoad(getFramePath(seq.folder, f), true);
      });
    }

    // Luego encolamos hasta el frame 30 con prioridad estándar
    for (let f = 6; f <= INITIAL_FRAMES_TO_PRELOAD; f++) {
      sequences.forEach((seq) => {
        requestImageLoad(getFramePath(seq.folder, f), false);
      });
    }
  }, [requestImageLoad]);

  // Pre-carga dinámica basada en la fase activa y adyacentes (sliding window)
  const handleDynamicPreload = useCallback(
    (activeStage: string) => {
      // Definimos qué secuencias precargar según la fase actual
      let stagesToLoad: SequenceKey[] = [];

      if (activeStage === STORY_STAGE.hero) {
        stagesToLoad = ["osmosis"];
      } else if (activeStage === STORY_STAGE.osmosis) {
        stagesToLoad = ["osmosis", "conversion"];
      } else if (activeStage === STORY_STAGE.conversion) {
        stagesToLoad = ["conversion", "osmosis", "molecular"];
      } else if (activeStage === STORY_STAGE.molecular) {
        stagesToLoad = ["molecular", "conversion", "ionization1"];
      } else if (activeStage === STORY_STAGE.ionization) {
        stagesToLoad = ["ionization1", "ionization2", "molecular"];
      } else {
        stagesToLoad = ["ionization2"];
      }

      // Carga secuencial de frames para las etapas seleccionadas
      stagesToLoad.forEach((stageKey) => {
        const seq = SEQUENCES[stageKey];
        // Cargamos cada 2 frames para acelerar la carga inicial del scroll, luego rellenamos
        for (let f = 1; f <= seq.total; f += 2) {
          requestImageLoad(getFramePath(seq.folder, f), false);
        }
        for (let f = 2; f <= seq.total; f += 2) {
          requestImageLoad(getFramePath(seq.folder, f), false);
        }
      });

      // Control de límite de caché para liberar memoria (evicción)
      // Si superamos las 700 imágenes cargadas, liberamos las que pertenezcan a etapas no adyacentes
      if (imageCacheRef.current.size > 700) {
        const activeFolders = new Set<string>(stagesToLoad.map((k) => SEQUENCES[k].folder));

        for (const [path, img] of imageCacheRef.current.entries()) {
          const pathFolder = path.split("/")[3]; // extract folder from path
          if (pathFolder && !activeFolders.has(pathFolder)) {
            imageCacheRef.current.delete(path);
            img.onload = null;
            img.onerror = null;
          }
        }
      }
    },
    [requestImageLoad],
  );

  // Efecto principal para inicializar la precarga
  useEffect(() => {
    if (reduced) return;
    preloadInitialFrames();
  }, [reduced, preloadInitialFrames]);

  // Bucle de animación/renderizado de GSAP/Scroll a Canvas 2D
  useEffect(() => {
    if (reduced) return;

    let rafId: number;
    let lastStage = "";
    let lastFramePath = "";

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Redimensionar el canvas teniendo en cuenta el ratio de píxeles del dispositivo
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Bucle tick
    const tick = () => {
      const stage = activeStageRef.current;

      // Control del fade cruzado WebGL / 2D Canvas manipulando opacidad
      const waterContainer = document.getElementById("water-canvas-container");
      const sequenceContainer = document.getElementById("sequence-canvas-container");

      if (stage === STORY_STAGE.hero) {
        if (waterContainer) waterContainer.style.opacity = "1";
        if (sequenceContainer) sequenceContainer.style.opacity = "0";
      } else {
        if (waterContainer) waterContainer.style.opacity = "0";
        if (sequenceContainer) sequenceContainer.style.opacity = "1";
      }

      // Si cambió de sección, disparamos la precarga dinámica para esa sección
      if (stage !== lastStage) {
        lastStage = stage;
        handleDynamicPreload(stage);
      }

      // Obtener el frame correspondiente al scroll progress
      let activeFolder = "";
      let activeTotal = 300;
      let progress = 0;

      let bgFolder = "";
      let bgFrameIdx = 300;
      let transitionOpacity = 1.0;

      const TRANSITION_ZONE = 0.15; // 15% del scroll para hacer fade-cross scroll-driven

      if (stage === STORY_STAGE.osmosis) {
        activeFolder = SEQUENCES.osmosis.folder;
        activeTotal = SEQUENCES.osmosis.total;
        progress = osmosisProgressRef.current;
      } else if (stage === STORY_STAGE.conversion) {
        activeFolder = SEQUENCES.conversion.folder;
        activeTotal = SEQUENCES.conversion.total;
        progress = conversionProgressRef.current;

        if (progress < TRANSITION_ZONE) {
          bgFolder = SEQUENCES.osmosis.folder;
          bgFrameIdx = SEQUENCES.osmosis.total;
          transitionOpacity = progress / TRANSITION_ZONE;
        }
      } else if (stage === STORY_STAGE.molecular) {
        activeFolder = SEQUENCES.molecular.folder;
        activeTotal = SEQUENCES.molecular.total;
        progress = molecularProgressRef.current;

        if (progress < TRANSITION_ZONE) {
          bgFolder = SEQUENCES.conversion.folder;
          bgFrameIdx = SEQUENCES.conversion.total;
          transitionOpacity = progress / TRANSITION_ZONE;
        }
      } else if (stage === STORY_STAGE.ionization) {
        const ionProgress = ionizationProgressRef.current;
        // Stage Ionization es doble altura:
        // 0.0 - 0.5: Secuencia 3 (Cellular Hydration)
        // 0.5 - 1.0: Secuencia 5 (Cellular Defense / Antioxidants)
        if (ionProgress < 0.5) {
          activeFolder = SEQUENCES.ionization1.folder;
          activeTotal = SEQUENCES.ionization1.total;
          progress = ionProgress * 2.0; // mapear 0.0-0.5 a 0.0-1.0

          if (progress < TRANSITION_ZONE) {
            bgFolder = SEQUENCES.molecular.folder;
            bgFrameIdx = SEQUENCES.molecular.total;
            transitionOpacity = progress / TRANSITION_ZONE;
          }
        } else {
          activeFolder = SEQUENCES.ionization2.folder;
          activeTotal = SEQUENCES.ionization2.total;
          progress = (ionProgress - 0.5) * 2.0; // mapear 0.5-1.0 a 0.0-1.0

          if (progress < TRANSITION_ZONE) {
            bgFolder = SEQUENCES.ionization1.folder;
            bgFrameIdx = SEQUENCES.ionization1.total;
            transitionOpacity = progress / TRANSITION_ZONE;
          }
        }
      } else if (stage === STORY_STAGE.cta) {
        // En la transición al final (CTA), dejamos el último frame celular
        activeFolder = SEQUENCES.ionization2.folder;
        activeTotal = SEQUENCES.ionization2.total;
        progress = 1.0;
      }

      // Si estamos en el Hero o fuera de secuencias y no hay dibujo, salteamos
      if (!activeFolder) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      // Cálculo del frame (1-indexado de 1 a total)
      const frameIdx = Math.max(
        1,
        Math.min(activeTotal, Math.floor(progress * (activeTotal - 1)) + 1),
      );
      const targetPath = getFramePath(activeFolder, frameIdx);

      // Si es el mismo frame que ya dibujamos y no hay transición activa, no hacemos nada
      const stateKey = `${targetPath}_${bgFolder ? `${bgFolder}_${bgFrameIdx}` : "no-bg"}_${transitionOpacity.toFixed(3)}`;
      if (stateKey === lastFramePath) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      // Dibujar imagen
      let img = imageCacheRef.current.get(targetPath);

      if (!img) {
        // Si no está cargado, lo solicitamos con prioridad alta y buscamos el frame más cercano
        requestImageLoad(targetPath, true);

        // Búsqueda del frame más cercano en la misma carpeta para evitar parpadeos
        let foundFallback = false;
        // Buscamos hacia atrás
        for (let d = 1; d <= 45; d++) {
          const checkFrameIdx = frameIdx - d;
          if (checkFrameIdx >= 1) {
            const checkPath = getFramePath(activeFolder, checkFrameIdx);
            const fallbackImg = imageCacheRef.current.get(checkPath);
            if (fallbackImg) {
              img = fallbackImg;
              foundFallback = true;
              break;
            }
          }
          const checkFrameIdxForward = frameIdx + d;
          if (checkFrameIdxForward <= activeTotal) {
            const checkPath = getFramePath(activeFolder, checkFrameIdxForward);
            const fallbackImg = imageCacheRef.current.get(checkPath);
            if (fallbackImg) {
              img = fallbackImg;
              foundFallback = true;
              break;
            }
          }
        }

        // Si tampoco hay cercano, buscamos el primer frame cargado de esta carpeta
        if (!foundFallback) {
          const firstFramePath = getFramePath(activeFolder, 1);
          img = imageCacheRef.current.get(firstFramePath);
        }
      }

      // Obtener imagen del background si hay transición activa
      const bgTargetPath = bgFolder ? getFramePath(bgFolder, bgFrameIdx) : "";
      let bgImg = bgTargetPath ? imageCacheRef.current.get(bgTargetPath) : null;
      if (bgTargetPath && !bgImg) {
        requestImageLoad(bgTargetPath, true);
        // Fallback rápido si el frame 300 no está en caché (usualmente sí lo está)
        bgImg = imageCacheRef.current.get(getFramePath(bgFolder, 300));
      }

      if (img && img.complete && img.naturalWidth > 0) {
        // Dibujado con responsive cover
        const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
        const canvasHeight = canvas.height / (window.devicePixelRatio || 1);

        const drawImg = (image: HTMLImageElement, alpha: number) => {
          const imgRatio = image.width / image.height;
          const canvasRatio = canvasWidth / canvasHeight;

          let drawWidth, drawHeight, drawX, drawY;

          if (canvasRatio > imgRatio) {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgRatio;
            drawX = 0;
            drawY = (canvasHeight - drawHeight) / 2;
          } else {
            drawWidth = canvasHeight * imgRatio;
            drawHeight = canvasHeight;
            drawX = (canvasWidth - drawWidth) / 2;
            drawY = 0;
          }

          ctx.globalAlpha = alpha;
          ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
        };

        if (bgImg && bgImg.complete && bgImg.naturalWidth > 0 && transitionOpacity < 1.0) {
          // Primero pintamos el frame anterior de fondo
          drawImg(bgImg, 1.0);
          // Pintamos el nuevo encima con opacidad creciente
          drawImg(img, transitionOpacity);
        } else {
          // Dibujo normal sin transición
          drawImg(img, 1.0);
        }

        ctx.globalAlpha = 1.0;
        lastFramePath = stateKey;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [reduced, handleDynamicPreload, requestImageLoad]);

  if (reduced) {
    return null;
  }

  return (
    <div
      id="sequence-canvas-container"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-0 transition-opacity duration-700 ease-in-out"
      style={{ willChange: "opacity" }}
    >
      <canvas ref={canvasRef} className="block h-full w-full object-cover" />
    </div>
  );
}
