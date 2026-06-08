## Deploy to Vercel
1. Push this project to GitHub.
2. In Vercel: New Project → import the repo.
3. Framework preset: Next.js (auto-detected).
4. Add environment variables:
   - `GOOGLE_SCRIPT_URL`
   - `GOOGLE_SCRIPT_TOKEN`
   - `NEXT_PUBLIC_SITE_URL` (set to your final Vercel URL once assigned)
5. Deploy.

## Notes
- RSVP requests go: Vercel → Next.js API routes → Google Apps Script → Google Sheets.
- Keep `GOOGLE_SCRIPT_TOKEN` secret; never expose it in client code.
