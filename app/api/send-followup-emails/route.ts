import { createAdminClient } from "@/utils/supabase/admin";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { Receiver } from "@upstash/qstash";

const receiver = new Receiver({
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY || "",
});

const resend = new Resend(process.env.RESEND_API_KEY!);

// --- Email Templates ---

function getEmailTemplate30Min(name: string) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
      <p style="margin-bottom: 16px;">Hey,</p>
      
      <p style="margin-bottom: 16px;">I'm Harvansh. I’m the solo founder building Unrealshot AI.</p>
      
      <p style="margin-bottom: 16px;">I saw you created an account a little while ago but didn't start your photoshoot yet.</p>
      
      <p style="margin-bottom: 16px;">To be honest, since I'm a one-person team, I'm constantly stressing over whether the onboarding is too confusing or if the pricing is scary.</p>
      
      <p style="margin-bottom: 16px;">Did you get stuck somewhere? Or were you just looking around?</p>
      
      <p style="margin-bottom: 16px;">If you have a specific worry about how the photos will turn out, just reply to this email. I read every single one and I'd love to help you out personally.</p>
      
      <p style="margin-top: 32px;">Best,</p>
      <p>Harvansh<br>Founder, Unrealshot.com</p>
    </div>
  `;
}

function getEmailTemplate4Hour(name: string) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
      <p style="margin-bottom: 16px;">Hey,</p>
      
      <p style="margin-bottom: 16px;">You didn't reply to my last note, so I’m guessing you’re either super busy (totally get it) or the pricing felt a little steep for something you haven't tried yet.</p>
      
      <p style="margin-bottom: 16px;">I really want you to see the quality of the AI I've built. I’m confident that once you see the results, you’ll love them.</p>
      
      <p style="margin-bottom: 16px;">So, I created a hidden code to lower the barrier for you:</p>
      
      <div style="background: #f0f0f0; padding: 12px; border-radius: 6px; text-align: center; margin: 20px 0;">
        <strong>Code: WELCOME20</strong> (Save 20%)
      </div>
      
      <p style="margin-bottom: 16px;">You can use this at checkout: <a href="https://unrealshot.com/subscribe" style="color: #007bff;">unrealshot.com/subscribe</a></p>
      
      <p style="margin-bottom: 16px;">My only ask: If you like the photos, would you mind sending me a quick reply? I'm desperately looking for feedbacks.</p>
      
      <p style="margin-top: 32px;">Cheers,</p>
      <p>Harvansh</p>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    // 1. Verify Upstash Signature
    const signature =
      request.headers.get("Upstash-Signature") ||
      request.headers.get("upstash-signature") ||
      "";

    const body = await request.text();

    // Skip verification in development if needed, but recommended to keep
    if (!receiver.verify({ body, signature })) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const supabase = createAdminClient();

    // --- Batch 1: 30-Minute Email ---
    // Target: Signed up 30m - 1.5h ago
    const batch30Min = await supabase.rpc("get_eligible_users_for_followup", {
      start_offset: "30 minutes",
      end_offset: "1 hour 30 minutes",
      target_email_type: "30min"
    });

    if (batch30Min.error) {
      console.error("Error fetching 30min batch:", batch30Min.error);
      // Continue to next batch instead of failing completely
    } else if (batch30Min.data && batch30Min.data.length > 0) {
      for (const user of batch30Min.data) {
        try {
          await resend.emails.send({
            from: "Harvansh from Unrealshot <harvansh@noreply.unrealshot.com>",
            to: user.email,
            subject: "quick question?",
            html: getEmailTemplate30Min(user.email),
            replyTo: "support@unrealshot.com",
          });

          await supabase.from("followup_email_logs").insert({
            user_id: user.id,
            email_type: "30min"
          });
        } catch (e) {
          console.error(`Failed to send 30min email to ${user.id}`, e);
        }
      }
    }

    // --- Batch 2: 4-Hour Email ---
    // Target: Signed up 4h - 6h ago
    const batch4Hour = await supabase.rpc("get_eligible_users_for_followup", {
      start_offset: "4 hours",
      end_offset: "6 hours",
      target_email_type: "4hour"
    });

    if (batch4Hour.error) {
      console.error("Error fetching 4hour batch:", batch4Hour.error);
    } else if (batch4Hour.data && batch4Hour.data.length > 0) {
      for (const user of batch4Hour.data) {
        try {
          await resend.emails.send({
            from: "Harvansh from Unrealshot <harvansh@noreply.unrealshot.com>",
            to: user.email,
            subject: "I have a small idea",
            html: getEmailTemplate4Hour(user.email),
            replyTo: "support@unrealshot.com",
          });

          await supabase.from("followup_email_logs").insert({
            user_id: user.id,
            email_type: "4hour"
          });
        } catch (e) {
          console.error(`Failed to send 4hour email to ${user.id}`, e);
        }
      }
    }

    return NextResponse.json({
      message: "Emails processed",
      sent_30min_count: batch30Min.data?.length || 0,
      sent_4hour_count: batch4Hour.data?.length || 0
    }, { status: 200 });

  } catch (error) {
    console.error("Detailed error (POST):", error);
    return NextResponse.json(
      { error: "Failed to process emails", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}