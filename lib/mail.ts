import { Resend } from 'resend';

interface SendMailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  bcc?: string | string[];
}

// Validate required environment variables at module load (server-side only)
function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const replyTo = process.env.RESEND_REPLY_TO;

  if (!apiKey) {
    throw new Error('[Mail] Missing required environment variable: RESEND_API_KEY');
  }
  if (!fromEmail) {
    throw new Error('[Mail] Missing required environment variable: RESEND_FROM_EMAIL');
  }

  return { apiKey, fromEmail, replyTo };
}

export const sendEmail = async (options: SendMailOptions) => {
  try {
    const { apiKey, fromEmail, replyTo } = getResendConfig();
    const resend = new Resend(apiKey);
    // Build payload — Resend SDK uses discriminated unions, so we only include
    // html/text when they are actually provided to satisfy the type system.
    const payload: Record<string, unknown> = {
      from: fromEmail,
      to: options.to,
      subject: options.subject,
      ...(replyTo ? { replyTo } : {}),
    };

    if (options.bcc) {
      payload.bcc = options.bcc;
    }

    if (options.html) {
      payload.html = options.html;
    } else if (options.text) {
      payload.text = options.text;
    }

    const { data, error } = await resend.emails.send(payload as unknown as Parameters<typeof resend.emails.send>[0]);

    if (error) {
      console.error('[Mail] Resend API error:', error.message);
      return { success: false, error };
    }

    console.log('[Mail] Email sent successfully:', data?.id);
    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('[Mail] Failed to send email:', error);
    return { success: false, error };
  }
};

/** Use when a caller's catch block records delivery failure. */
export async function sendEmailOrThrow(options: SendMailOptions) {
  const result = await sendEmail(options);
  if (!result.success) throw new Error("Email provider did not accept delivery");
  return result;
}
