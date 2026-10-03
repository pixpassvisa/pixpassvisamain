import { NextResponse } from "next/server";

/**
 * Server-side probe for the Render photo API.
 * It intentionally exposes configuration status and the upstream health
 * status only; API keys and upstream response bodies never leave the server.
 */
export async function GET() {
  const configuredUrl = process.env.PASSPORT_API_URL?.trim().replace(/\/$/, "");
  const configuredKey = Boolean(process.env.PASSPORT_API_KEY?.trim());

  if (!configuredUrl || !configuredKey) {
    return NextResponse.json(
      {
        status: "misconfigured",
        apiUrlConfigured: Boolean(configuredUrl),
        apiKeyConfigured: configuredKey,
      },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch(`${configuredUrl}/health`, {
      headers: { accept: "application/json" },
      cache: "no-store",
      signal: controller.signal,
    });

    let upstream: unknown = null;
    try {
      upstream = await response.json();
    } catch {
      // Keep the probe useful even if an unhealthy upstream returns non-JSON.
    }

    return NextResponse.json(
      {
        status: response.ok ? "healthy" : "unhealthy",
        apiUrlConfigured: true,
        apiKeyConfigured: true,
        upstreamStatus: response.status,
        upstream,
      },
      {
        status: response.ok ? 200 : 502,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "unreachable",
        apiUrlConfigured: true,
        apiKeyConfigured: true,
        error: error instanceof Error && error.name === "AbortError" ? "timeout" : "connection_failed",
      },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  } finally {
    clearTimeout(timeout);
  }
}
