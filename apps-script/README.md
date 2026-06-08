## Google Sheets Setup
- Create a Google Sheet (any name).
- Ensure there is a tab named `RSVP` (the script will create it if missing).

## Apps Script Setup
1. In your Google Sheet, go to Extensions → Apps Script.
2. Create a file named `Code.gs` and paste the contents of [Code.gs](file:///c:/Projects/wedding-rsvp-trae/apps-script/Code.gs).
3. In Apps Script: Project Settings → Script Properties → add:
   - `RSVP_TOKEN` = (generate a long random secret)

## Deploy as Web App
1. Click Deploy → New deployment.
2. Select type: Web app.
3. Execute as: Me.
4. Who has access: Anyone.
5. Deploy and copy the Web App URL.

## Next.js Environment Variables (Vercel + Local)
Create a `.env.local` (local) or Vercel environment variables:
- `GOOGLE_SCRIPT_URL` = your Apps Script Web App URL
- `GOOGLE_SCRIPT_TOKEN` = the same `RSVP_TOKEN` value
- `NEXT_PUBLIC_SITE_URL` = your deployed site URL (optional but recommended for SEO)

## Test Quickly
Local:
```bash
npm run dev -- --webpack
```
Then submit an RSVP and confirm rows appear in the `RSVP` sheet.
