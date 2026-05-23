import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "aqua-plus-web",
    timestamp: new Date().toISOString(),
  });
}
