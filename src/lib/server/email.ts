import nodemailer from "nodemailer";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendRsvpConfirmation(
  email: string,
  name: string,
  attendance: "yes" | "no",
  guestCount: number
) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn(
      "EMAIL_USER or EMAIL_PASS not set. Skipping confirmation email."
    );
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

  const safeName = escapeHtml(name);
  const safeGuestCount = Math.max(1, Number(guestCount) || 1);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://20-10-digital-invitation.vercel.app";

  const subject = isAttending
    ? "20/10 – Xác nhận đăng ký của bạn ✨"
    : "20/10 – Xác nhận RSVP của bạn";

  const html = isAttending
    ? `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Xác nhận RSVP 20/10</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #fdf7f3;
  font-family: Arial, Helvetica, sans-serif;
  color: #5d4037;
">

  <div style="
    width: 100%;
    padding: 40px 16px;
    box-sizing: border-box;
  ">

    <div style="
      max-width: 560px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #eaded8;
      border-radius: 16px;
      overflow: hidden;
    ">

      <!-- Header -->
      <div style="
        padding: 36px 32px 28px;
        text-align: center;
        background-color: #fff8f4;
      ">
        <div style="
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #a87568;
          margin-bottom: 12px;
        ">
          20/10 · Vietnamese Women's Day
        </div>

        <h1 style="
          margin: 0;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 30px;
          font-weight: 500;
          line-height: 1.3;
          color: #7d211b;
        ">
          RSVP của bạn đã được xác nhận ✨
        </h1>
      </div>

      <!-- Content -->
      <div style="
        padding: 32px;
      ">

        <p style="
          margin: 0 0 18px;
          font-size: 15px;
          line-height: 1.7;
        ">
          Xin chào <strong>${safeName}</strong>,
        </p>

        <p style="
          margin: 0 0 28px;
          font-size: 15px;
          line-height: 1.7;
          color: #705c56;
        ">
          Cảm ơn bạn đã đăng ký tham dự chương trình 20/10.
          Thông tin RSVP của bạn đã được ghi nhận thành công.
        </p>

        <!-- Event information -->
        <div style="
          border: 1px solid #eaded8;
          border-radius: 12px;
          padding: 22px;
          margin-bottom: 24px;
        ">

          <div style="
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 20px;
            color: #7d211b;
            margin-bottom: 18px;
          ">
            20/10 – Vietnamese Women's Day
          </div>

          <div style="
            font-size: 14px;
            line-height: 1.8;
            color: #705c56;
          ">
            <div>
              <strong style="color: #5d4037;">Ngày:</strong>
              20 tháng 10, 2026
            </div>

            <div>
              <strong style="color: #5d4037;">Thời gian:</strong>
              11:00
            </div>

            <div>
              <strong style="color: #5d4037;">Địa điểm:</strong>
              Chongqing University, Trung Quốc
            </div>
          </div>
        </div>

        <!-- RSVP status -->
        <div style="
          background-color: #fff8f4;
          border-radius: 12px;
          padding: 20px 22px;
          margin-bottom: 28px;
        ">

          <div style="
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #a87568;
            margin-bottom: 10px;
          ">
            Thông tin đăng ký
          </div>

          <div style="
            font-size: 15px;
            line-height: 1.8;
            color: #5d4037;
          ">
            <div>
              <strong>Trạng thái:</strong>
              Bạn sẽ tham dự
            </div>

            <div>
              <strong>Số người:</strong>
              ${safeGuestCount}
            </div>
          </div>
        </div>

        <p style="
          margin: 0 0 26px;
          text-align: center;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 17px;
          line-height: 1.6;
          color: #7d211b;
        ">
          Hẹn gặp bạn vào ngày 20/10 tại Trùng Khánh! 🤍
        </p>

        <!-- CTA -->
        <div style="
          text-align: center;
          margin-bottom: 28px;
        ">
          <a
            href="${siteUrl}"
            style="
              display: inline-block;
              padding: 13px 24px;
              background-color: #7d211b;
              color: #ffffff;
              text-decoration: none;
              border-radius: 8px;
              font-size: 14px;
              font-weight: bold;
            "
          >
            Xem lại thư mời
          </a>
        </div>

        <div style="
          height: 1px;
          background-color: #eaded8;
          margin-bottom: 22px;
        "></div>

        <p style="
          margin: 0;
          text-align: center;
          font-size: 12px;
          line-height: 1.7;
          color: #9a8983;
        ">
          Nếu cần cập nhật thông tin RSVP,
          bạn có thể quay lại trang thư mời để thực hiện thay đổi.
        </p>

      </div>

      <!-- Footer -->
      <div style="
        padding: 22px 32px;
        text-align: center;
        background-color: #fffaf7;
        border-top: 1px solid #eaded8;
      ">
        <div style="
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 16px;
          color: #7d211b;
          margin-bottom: 6px;
        ">
          Một ngày dành cho yêu thương.
        </div>

        <div style="
          font-size: 12px;
          color: #9a8983;
        ">
          20.10.2026 · Chongqing
        </div>
      </div>

    </div>
  </div>

</body>
</html>
`
    : `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Xác nhận RSVP 20/10</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #fdf7f3;
  font-family: Arial, Helvetica, sans-serif;
  color: #5d4037;
">

  <div style="
    width: 100%;
    padding: 40px 16px;
    box-sizing: border-box;
  ">

    <div style="
      max-width: 560px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #eaded8;
      border-radius: 16px;
      overflow: hidden;
    ">

      <div style="
        padding: 36px 32px 28px;
        text-align: center;
        background-color: #fff8f4;
      ">
        <div style="
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #a87568;
          margin-bottom: 12px;
        ">
          20/10 · Vietnamese Women's Day
        </div>

        <h1 style="
          margin: 0;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 30px;
          font-weight: 500;
          line-height: 1.3;
          color: #7d211b;
        ">
          RSVP của bạn đã được ghi nhận
        </h1>
      </div>

      <div style="padding: 32px;">

        <p style="
          margin: 0 0 18px;
          font-size: 15px;
          line-height: 1.7;
        ">
          Xin chào <strong>${safeName}</strong>,
        </p>

        <p style="
          margin: 0 0 28px;
          font-size: 15px;
          line-height: 1.7;
          color: #705c56;
        ">
          Cảm ơn bạn đã phản hồi lời mời tham dự chương trình 20/10.
          Chúng mình đã ghi nhận rằng bạn sẽ không tham dự sự kiện lần này.
        </p>

        <div style="
          border: 1px solid #eaded8;
          border-radius: 12px;
          padding: 22px;
          margin-bottom: 28px;
        ">

          <div style="
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 20px;
            color: #7d211b;
            margin-bottom: 18px;
          ">
            20/10 – Vietnamese Women's Day
          </div>

          <div style="
            font-size: 14px;
            line-height: 1.8;
            color: #705c56;
          ">
            <div>
              <strong style="color: #5d4037;">Ngày:</strong>
              20 tháng 10, 2026
            </div>

            <div>
              <strong style="color: #5d4037;">Địa điểm:</strong>
              Chongqing University, Trung Quốc
            </div>

            <div>
              <strong style="color: #5d4037;">Trạng thái:</strong>
              Không tham dự
            </div>
          </div>
        </div>

        <p style="
          margin: 0 0 26px;
          text-align: center;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 17px;
          line-height: 1.6;
          color: #7d211b;
        ">
          Cảm ơn bạn đã dành thời gian phản hồi. 🤍
        </p>

        <div style="
          text-align: center;
          margin-bottom: 28px;
        ">
          <a
            href="${siteUrl}"
            style="
              display: inline-block;
              padding: 13px 24px;
              background-color: #7d211b;
              color: #ffffff;
              text-decoration: none;
              border-radius: 8px;
              font-size: 14px;
              font-weight: bold;
            "
          >
            Xem lại thư mời
          </a>
        </div>

        <div style="
          height: 1px;
          background-color: #eaded8;
          margin-bottom: 22px;
        "></div>

        <p style="
          margin: 0;
          text-align: center;
          font-size: 12px;
          line-height: 1.7;
          color: #9a8983;
        ">
          Nếu thông tin RSVP cần được cập nhật,
          bạn có thể quay lại trang thư mời để thực hiện thay đổi.
        </p>

      </div>

      <div style="
        padding: 22px 32px;
        text-align: center;
        background-color: #fffaf7;
        border-top: 1px solid #eaded8;
      ">
        <div style="
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 16px;
          color: #7d211b;
          margin-bottom: 6px;
        ">
          Một ngày dành cho yêu thương.
        </div>

        <div style="
          font-size: 12px;
          color: #9a8983;
        ">
          20.10.2026 · Chongqing
        </div>
      </div>

    </div>
  </div>

</body>
</html>
`;

  const text = isAttending
    ? `
20/10 – Vietnamese Women's Day

RSVP của bạn đã được xác nhận ✨

Xin chào ${name},

Cảm ơn bạn đã đăng ký tham dự chương trình 20/10.
Thông tin RSVP của bạn đã được ghi nhận thành công.

THÔNG TIN SỰ KIỆN
Ngày: 20 tháng 10, 2026
Thời gian: 11:00
Địa điểm: Chongqing University, Trung Quốc

THÔNG TIN ĐĂNG KÝ
Trạng thái: Bạn sẽ tham dự
Số người: ${safeGuestCount}

Hẹn gặp bạn vào ngày 20/10 tại Trùng Khánh!

Xem lại thư mời:
${siteUrl}

Một ngày dành cho yêu thương.
20.10.2026 · Chongqing
`
    : `
20/10 – Vietnamese Women's Day

RSVP của bạn đã được ghi nhận

Xin chào ${name},

Cảm ơn bạn đã phản hồi lời mời tham dự chương trình 20/10.
Chúng mình đã ghi nhận rằng bạn sẽ không tham dự sự kiện lần này.

THÔNG TIN SỰ KIỆN
Ngày: 20 tháng 10, 2026
Địa điểm: Chongqing University, Trung Quốc

Trạng thái: Không tham dự

Cảm ơn bạn đã dành thời gian phản hồi.

Xem lại thư mời:
${siteUrl}

Một ngày dành cho yêu thương.
20.10.2026 · Chongqing
`;

  await transporter.sendMail({
    from: `"20/10 · Vietnamese Women's Day" <${process.env.EMAIL_USER}>`,
    replyTo: process.env.EMAIL_USER,
    to: email,
    subject,
    text,
    html,
  });
}