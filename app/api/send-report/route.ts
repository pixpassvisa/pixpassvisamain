import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { email, checks, documentType } = await req.json();

    if (!email || !checks || !Array.isArray(checks)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailStr = String(email).trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailStr)) {
      return NextResponse.json({ error: "Invalid email address format" }, { status: 400 });
    }

    const { getSpecById } = await import("@/lib/specs");
    const spec = documentType ? getSpecById(documentType) : null;
    const docName = spec?.name || (documentType ? String(documentType).slice(0, 50).replace(/[^a-zA-Z0-9\s-]/g, '').toUpperCase() : 'Photo');
    
    // Calculate passing/failing checks
    const passed = checks.filter(c => c.status === "PASS").length;
    const failed = checks.filter(c => c.status === "FAIL").length;
    const total = checks.length;
    
    let checksHtml = `
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
          <tr style="background-color: #f8fafc; text-align: left;">
            <th style="padding: 12px; border-bottom: 2px solid #e2e8f0;">Requirement</th>
            <th style="padding: 12px; border-bottom: 2px solid #e2e8f0;">Status</th>
            <th style="padding: 12px; border-bottom: 2px solid #e2e8f0;">Result</th>
          </tr>
        </thead>
        <tbody>
    `;

    const escapeHtml = (str: unknown) =>
      String(str ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    checks.forEach((check: any) => {
      const isPass = check.status === "PASS";
      const color = isPass ? "#65a30d" : (check.status === "FAIL" ? "#dc2626" : "#ca8a04");
      const safeName = escapeHtml(check.name);
      const safeStatus = escapeHtml(check.status);
      const safeDetail = escapeHtml(check.detail);
      checksHtml += `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;"><strong>${safeName}</strong></td>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: ${color}; font-weight: bold;">${safeStatus}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${safeDetail}</td>
        </tr>
      `;
    });

    checksHtml += `
        </tbody>
      </table>
    `;

    const statusBadge = failed === 0 
      ? `<span style="background-color: #eff6ff; color: #4d7c0f; padding: 4px 10px; border-radius: 9999px; font-weight: bold;">COMPLIANT</span>`
      : `<span style="background-color: #fee2e2; color: #b91c1c; padding: 4px 10px; border-radius: 9999px; font-weight: bold;">NOT COMPLIANT</span>`;

    const htmlContent = `
      <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #4f46e5;">Validation Report: ${escapeHtml(docName)}</h2>
        <p>Hi there,</p>
        <p>Here is your free validation report from PixPassVisa for the photo you just uploaded.</p>
        
        <div style="margin: 20px 0;">
          <p><strong>Overall Status:</strong> ${statusBadge}</p>
          <p><strong>Score:</strong> ${passed} passed, ${failed} failed (out of ${total} checks)</p>
        </div>
        
        ${checksHtml}
        
        <p style="margin-top: 30px; font-size: 14px; color: #64748b;">
          Visit <a href="https://www.pixpassvisa.com">pixpassvisa.com</a> to process your photo or validate another one.
        </p>
      </div>
    `;

    const result = await sendEmail({
      to: emailStr,
      subject: `${failed === 0 ? '✅ Passed' : '❌ Failed'} Validation Report: ${docName}`,
      html: htmlContent,
    });

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      throw new Error("Email sending failed");
    }
  } catch (error: any) {
    console.error("Failed to send validation report via email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
