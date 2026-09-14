import { NextRequest, NextResponse } from "next/server";
import { NodeHtmlMarkdown } from "node-html-markdown";

export async function GET(req: NextRequest) {
  let targetPath = req.nextUrl.searchParams.get("path") || "/";

  // If path is a full URL, extract the pathname + search if origin matches
  if (targetPath.startsWith("http://") || targetPath.startsWith("https://")) {
    try {
      const parsedUrl = new URL(targetPath);
      targetPath = parsedUrl.pathname + parsedUrl.search;
    } catch {
      targetPath = "/";
    }
  }

  // Ensure leading slash and normalize
  if (!targetPath.startsWith("/")) {
    targetPath = `/${targetPath}`;
  }

  // Prevent directory traversal or protocol relative exploits
  if (targetPath.startsWith("//")) {
    targetPath = targetPath.replace(/^\/+/, "/");
  }

  // Construct target URL using current origin
  const origin = req.nextUrl.origin;
  const targetUrl = new URL(targetPath, origin);

  // Safe headers to forward
  const headers = new Headers();
  if (req.headers.get("cookie")) {
    headers.set("cookie", req.headers.get("cookie")!);
  }
  if (req.headers.get("user-agent")) {
    headers.set("user-agent", req.headers.get("user-agent")!);
  }
  
  // CRITICAL: Request HTML from the origin to prevent recursive markdown loops
  headers.set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9");
  
  try {
    const response = await fetch(targetUrl.toString(), {
      headers,
    });

    if (!response.ok) {
      return new NextResponse(`Error fetching original content (${response.status})`, {
        status: response.status,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    let html = await response.text();

    // Clean out script, style, and noscript tags to prevent JSON payloads in markdown
    html = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, "");
    
    // Parse the HTML into Markdown
    const markdown = NodeHtmlMarkdown.translate(html);
    
    // Estimate tokens (roughly 1 token per 4 characters in English text)
    const estimatedTokens = Math.ceil(markdown.length / 4);

    return new NextResponse(markdown, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Vary": "Accept",
        "x-markdown-tokens": estimatedTokens.toString(),
        "Content-Signal": "ai-train=no, search=yes, ai-input=yes",
      },
    });
  } catch (error) {
    console.error("Failed to generate markdown:", error);
    return new NextResponse("Internal Server Error generating markdown", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

