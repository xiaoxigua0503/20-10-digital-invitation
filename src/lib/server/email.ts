import nodemailer from "nodemailer";

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
    ? "Cảm ơn cho RSVP của bạn!"
    : "Xác nhận RSVP của bạn";

  const html = isAttending
    ? `
    <div style="background-color: #FFF6F0; padding: 40px 20px; font-family: Arial, sans-serif;">
      <div style="max-width: 540px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 24px; text-align: center; border: 1px solid rgba(108, 22, 19, 0.12); box-shadow: 0 10px 40px rgba(58, 31, 27, 0.10);">
        <h1 style="color: #6C1613; font-family: Georgia, serif; font-size: 32px; margin-bottom: 24px; font-weight: normal;">Cảm ơn, ${name}!</h1>
        <p style="color: #6D4A44; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">RSVP của bạn đã được nhận cho sự kiện 20/10 tại Chongqing.</p>
        <div style="background-color: rgba(255,255,255,0.85); padding: 24px; border-radius: 16px; margin: 24px auto; border: 1px solid rgba(108, 22, 19, 0.12); display: inline-block; text-align: left; min-width: 200px;">
          <p style="margin: 0 0 12px 0; color: #6D4A44; font-size: 15px;"><strong>Tham dự:</strong> <span style="color: #6C1613;">Có</span></p>
          <p style="margin: 0; color: #6D4A44; font-size: 15px;"><strong>Số khách:</strong> ${guestCount}</p>
        </div>
        <p style="color: #6D4A44; font-size: 16px; line-height: 1.6;">Hẹn gặp bạn vào <strong>20 tháng 10, 2026 tại Chongqing</strong>!</p>
        <hr style="border: none; border-top: 1px solid rgba(108, 22, 19, 0.14); margin: 32px 0;" />
        <p style="font-size: 13px; color: #887B79; line-height: 1.5;">Nếu bạn cần cập nhật RSVP, hãy dùng email hoặc số điện thoại trên trang.</p>
      </div>
    </div>
    `
    : `
    <div style="background-color: #FFF6F0; padding: 40px 20px; font-family: Arial, sans-serif;">
      <div style="max-width: 540px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 24px; text-align: center; border: 1px solid rgba(108, 22, 19, 0.12); box-shadow: 0 10px 40px rgba(58, 31, 27, 0.10);">
        <h1 style="color: #6C1613; font-family: Georgia, serif; font-size: 32px; margin-bottom: 24px; font-weight: normal;">Cảm ơn, ${name}!</h1>
        <div style="background-color: rgba(255,255,255,0.85); padding: 24px; border-radius: 16px; margin: 24px auto; border: 1px solid rgba(108, 22, 19, 0.12);">
          <p style="color: #6D4A44; font-size: 16px; line-height: 1.6; margin-bottom: 16px; margin-top: 0;">RSVP của bạn đã được nhận.</p>
          <p style="color: #6D4A44; font-size: 16px; line-height: 1.6; margin-bottom: 0;">Cảm ơn bạn đã cho biết kế hoạch của bạn. Nếu có thay đổi, bạn có thể cập nhật RSVP trên trang.</p>
        </div>
        <hr style="border: none; border-top: 1px solid rgba(108, 22, 19, 0.14); margin: 32px 0;" />
        <p style="font-size: 13px; color: #887B79; line-height: 1.5;">Bạn có thể cập nhật RSVP bằng email hoặc số điện thoại trên trang.</p>
      </div>
    </div>
    `;

  const text = isAttending
    ? `Cảm ơn, ${name}!\n\nRSVP của bạn đã được nhận cho sự kiện 20/10 tại Chongqing.\n\nTham dự: Có\nSố khách: ${guestCount}\n\nHẹn gặp bạn vào 20 tháng 10, 2026 tại Chongqing!\n\nNếu bạn cần cập nhật RSVP, hãy dùng email hoặc số điện thoại trên trang.`
    : `Cảm ơn, ${name}!\n\nRSVP của bạn đã được nhận.\n\nCảm ơn bạn đã cho biết kế hoạch của bạn. Nếu có thay đổi, bạn có thể cập nhật RSVP trên trang.`;

  await transporter.sendMail({
    from: `"20/10 Invitation" <${process.env.EMAIL_USER}>`,
    replyTo: process.env.EMAIL_USER,
    to: email,
    subject,
    text,
    html,
  });
}
