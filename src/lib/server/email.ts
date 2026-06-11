import nodemailer from "nodemailer";
import path from "path";

export async function sendRsvpConfirmation(
  email: string,
  name: string,
  attendance: "yes" | "no",
  guestCount: number
) {
  // If no email user is provided, we can't send the email
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("EMAIL_USER or EMAIL_PASS not set. Skipping confirmation email.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const isAttending = attendance === "yes";

  const subject = isAttending
    ? "Thank you for your RSVP! We can't wait to see you."
    : "Sorry you can't make it! (RSVP Confirmation)";

  const html = isAttending
    ? `
    <div style="background-color: #F8EDEB; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      <div style="max-width: 540px; margin: 0 auto; background-image: url('cid:bg'); background-size: cover; background-position: center; background-color: #ffffff; padding: 40px; border-radius: 24px; text-align: center; border: 1px solid rgba(255,255,255,0.6); box-shadow: 0 10px 40px rgba(58, 31, 27, 0.15);">
        <h1 style="color: #6C2B29; font-family: Georgia, serif; font-size: 32px; margin-bottom: 24px; font-weight: normal;">Thank you, ${name}!</h1>
        <p style="color: #5A403D; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">We have successfully received your RSVP for our wedding.</p>
        
        <div style="background-color: rgba(255,255,255,0.85); padding: 24px; border-radius: 16px; margin: 24px auto; border: 1px solid rgba(255,255,255,0.9); display: inline-block; text-align: left; min-width: 200px; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
          <p style="margin: 0 0 12px 0; color: #5A403D; font-size: 15px;"><strong>Attendance:</strong> <span style="color: #6C2B29;">Joyfully Attending!</span></p>
          <p style="margin: 0; color: #5A403D; font-size: 15px;"><strong>Total Guests:</strong> ${guestCount}</p>
        </div>

        <p style="color: #5A403D; font-size: 16px; line-height: 1.6;">We are so excited to celebrate with you on <strong>June 19, 2026</strong>!</p>
        
        <hr style="border: none; border-top: 1px solid rgba(108, 43, 41, 0.15); margin: 32px 0;" />
        <p style="font-size: 13px; color: #887B79; line-height: 1.5; background-color: rgba(255,255,255,0.6); padding: 8px; border-radius: 8px;">If you need to update your RSVP, you can do so on our website using your email address or phone number.</p>
      </div>
    </div>
    `
    : `
    <div style="background-color: #F8EDEB; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      <div style="max-width: 540px; margin: 0 auto; background-image: url('cid:bg'); background-size: cover; background-position: center; background-color: #ffffff; padding: 40px; border-radius: 24px; text-align: center; border: 1px solid rgba(255,255,255,0.6); box-shadow: 0 10px 40px rgba(58, 31, 27, 0.15);">
        <h1 style="color: #6C2B29; font-family: Georgia, serif; font-size: 32px; margin-bottom: 24px; font-weight: normal;">Thank you, ${name}!</h1>
        <div style="background-color: rgba(255,255,255,0.85); padding: 24px; border-radius: 16px; margin: 24px auto; border: 1px solid rgba(255,255,255,0.9);">
          <p style="color: #5A403D; font-size: 16px; line-height: 1.6; margin-bottom: 16px; margin-top: 0;">We have successfully received your RSVP.</p>
          <p style="color: #5A403D; font-size: 16px; line-height: 1.6; margin-bottom: 0;">We're sorry to hear you won't be able to make it, but we completely understand and appreciate you letting us know!</p>
        </div>
        <hr style="border: none; border-top: 1px solid rgba(108, 43, 41, 0.15); margin: 32px 0;" />
        <p style="font-size: 13px; color: #887B79; line-height: 1.5; background-color: rgba(255,255,255,0.6); padding: 8px; border-radius: 8px;">If your plans change, you can update your RSVP on our website using your email address or phone number.</p>
      </div>
    </div>
    `;

  const text = isAttending
    ? `Thank you, ${name}!\n\nWe have successfully received your RSVP for our wedding.\n\nAttendance: Yes, joyfully attending!\nTotal Guests: ${guestCount}\n\nWe are so excited to celebrate with you on June 19, 2026!\n\nIf you need to update your RSVP, you can do so on our website using your email address or phone number.`
    : `Thank you, ${name}!\n\nWe have successfully received your RSVP.\n\nWe're sorry to hear you won't be able to make it, but we completely understand and appreciate you letting us know!\n\nIf your plans change, you can update your RSVP on our website using your email address or phone number.`;

  await transporter.sendMail({
    from: `"Christine & Angelo" <${process.env.EMAIL_USER}>`,
    replyTo: process.env.EMAIL_USER,
    to: email,
    subject,
    text,
    html,
    attachments: [
      {
        filename: '3.jpg',
        path: path.join(process.cwd(), 'public', 'background', '3.jpg'),
        cid: 'bg'
      }
    ]
  });
}
