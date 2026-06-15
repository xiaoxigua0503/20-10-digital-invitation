# Christine & Angelo's Wedding RSVP Website

A premium, highly-interactive, responsive Next.js wedding invitation and RSVP platform. This project features stunning paper-morphic micro-animations, background music toggles, parallax transitions, Google Maps integration, and a serverless Google Sheets + Nodemailer RSVP management backend.

---

## 🎨 Design & Key Features

*   **Intro Envelope Animation**: A 3D realistic envelope with a customizable wax seal that opens upon user gesture, revealing a traditional wedding letter and triggering background music.
*   **Hero & Countdown**: Elegant modern serif typography displaying the couple’s names, wedding date, and an active counting-down timer.
*   **Event Details**: Modular, card-based designs showing the Ceremony, Reception, and Dinner venues, complete with dates, times, and embedded Google Maps coordinates.
*   **Dress Code Palette**: Visual guides for men's and women's attire along with custom-themed interactive color swatches (Soft Creamy Peach, Dusty Rose, Terracotta, Muted Dusty Blue).
*   **Wedding Timeline**: Beautifully structured vertical schedule tracking the timeline from Guest Arrival up to the Friends & Family Dinner.
*   **Photo Gallery**: Dynamic multi-column masonry grid showcase of pre-wedding photographs with full-screen lightbox preview capabilities.
*   **Gift Registry**: Simple, elegant cards displaying GCash QR codes and instructions for wishing well contributions.
*   **RSVP System**: Interactive form featuring:
    *   **Lookup Feature**: Allows guests to lookup their existing RSVP status using their Email or Phone Number.
    *   **Upsert Submission**: Allows guests to register or update their attendance, guest count, and custom messages.
    *   **Email Confirmations**: Automatically sends beautiful HTML confirmation emails (using Nodemailer + background template embeds) once RSVP is updated.
    *   **Google Sheets Database**: Direct serverless connection using Google Apps Script acting as the database.

---

## 🛠️ Technology Stack

*   **Framework**: Next.js 14 (App Router)
*   **Core**: React 18, TypeScript, Tailwind CSS v4
*   **Animations**: CSS Transitions, Keyframes, custom 3D Perspective transforms, SweetAlert2
*   **Backend**: Serverless Next.js API Routes, Google Apps Script
*   **Email**: Nodemailer (SMTP Service / Gmail)
*   **Analytics**: Vercel Analytics

---

## 📁 Repository Structure

```text
├── apps-script/            # Google Sheets backend code
│   ├── Code.gs            # Google Apps Script API endpoints (upsert, lookup)
│   └── README.md          # Guide to setting up the script properties & permissions
├── docs/                  # Detailed documentation
│   ├── COMPONENTS.md      # Mapping of components and pages
│   ├── DEPLOYMENT.md      # Vercel deployment instructions
│   └── QR.md              # QR code printing & generation instructions
├── public/                # Static public assets
│   ├── audio/             # Background music files (piano.mp3)
│   ├── background/        # Section background texture images (1.jpg to 5.jpg)
│   ├── gallery/           # Pre-wedding pictures, attire guides, and GCash QR codes
│   ├── intro/             # Wax seal PNG and logo icons
│   └── snapshots/         # Folder for visual previews of the invitation sections
├── src/
│   ├── app/               # Next.js pages, layouts, global CSS, and API routes
│   │   ├── api/rsvp/      # POST /api/rsvp (upsert) & POST /api/rsvp/lookup (lookup)
│   │   ├── layout.tsx     # Site structure, fonts (Cormorant Garamond & Plus Jakarta Sans), SEO metadata
│   │   └── page.tsx       # Entry point launching ClientApp
│   ├── components/        # Reusable UI elements (IntroEnvelope, AudioPlayer, MapEmbed, Accordion)
│   ├── hooks/             # Custom React hooks (prefers-reduced-motion)
│   ├── lib/               # Shared constants, helpers, and types
│   │   ├── server/        # Server-only utilities (Nodemailer client, Apps Script caller)
│   │   ├── images.ts      # Gallery image arrays & text-to-image utils
│   │   ├── rsvp.ts        # TypeScript definitions for RSVPs
│   │   └── wedding.ts     # Editable wedding data (entourage list, timeline, faq, detail text)
│   └── sections/          # Modular website sections (Hero, Countdown, Story, DressCode, Venue, etc.)
├── package.json           # Node dependencies and scripts
└── tsconfig.json          # TypeScript configurations
```

---

## 📸 Snapshots Directory Guide

To display interactive previews of the user interface on your repository's landing page, we recommend taking high-quality screenshots (snapshots) of the key sections of your website and saving them inside `public/snapshots/`. 

Below is the list of recommended snapshots to capture:

| File Name | Recommended Resolution | Description |
| :--- | :--- | :--- |
| `envelope_closed.png` | 800×600 (Aspect 4:3) | Closed invitation envelope with the wax seal in the middle. |
| `envelope_open.png` | 800×600 (Aspect 4:3) | The envelope in the process of flipping open. |
| `envelope_revealed.png`| 800×600 (Aspect 4:3) | The envelope completely open, showing the invitation card lifted out. |
| `hero_section.png` | 1920×1080 (Aspect 16:9)| Desktop view of the Hero Section showing the Title and Countdown. |
| `details_section.png` | 1200×800 (Aspect 3:2) | The Ceremony, Reception, and Dinner details cards. |
| `attire_section.png` | 1200×800 (Aspect 3:2) | The Dress Code section showing Men's/Women's attire and color swatches. |
| `timeline_section.png` | 1200×800 (Aspect 3:2) | The wedding day schedule vertical timeline. |
| `gallery_section.png` | 1200×800 (Aspect 3:2) | The masonry grid of pre-wedding gallery photos. |
| `rsvp_section.png` | 1200×800 (Aspect 3:2) | The interactive RSVP form showing lookup inputs or the upsert form. |

### 🖼️ UI Snapshots Gallery

Here is a visual walk-through of the invitation:

````carousel
```text
Envelope State: Closed
[See public/snapshots/envelope_closed.png]
```
<!-- slide -->
```text
Envelope State: Opening
[See public/snapshots/envelope_open.png]
```
<!-- slide -->
```text
Envelope State: Invitation Revealed
[See public/snapshots/envelope_revealed.png]
```
<!-- slide -->
```text
Dashboard: Welcome Hero & Countdown
[See public/snapshots/hero_section.png]
```
<!-- slide -->
```text
Dashboard: Event Details & Venues
[See public/snapshots/details_section.png]
```
<!-- slide -->
```text
Dashboard: Dress Code & Palette Swatches
[See public/snapshots/attire_section.png]
```
<!-- slide -->
```text
Dashboard: Interactive RSVP Lookup & RSVP Submission Form
[See public/snapshots/rsvp_section.png]
```
````

---

## 🚀 Getting Started

### 1. Prerequisites
Make sure you have Node.js 18+ installed on your system.

### 2. Local Environment Variables (`.env.local`)
Create a `.env.local` file in the root directory and specify the following details:
```bash
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
GOOGLE_SCRIPT_TOKEN=your_custom_secure_secret_token
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### 3. Run Locally
Install the dependencies and start the development server:
```bash
# Install packages
npm install

# Run in development
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 Backend Configuration (Google Sheets)

1. Create a Google Spreadsheet and name it whatever you like.
2. In the sheet, go to **Extensions** → **Apps Script**.
3. Create a new script file and paste the contents of `apps-script/Code.gs`.
4. Navigate to **Project Settings** → **Script Properties** and add:
   *   `RSVP_TOKEN` = `your_custom_secure_secret_token` (must match the token in `.env.local`)
5. Click **Deploy** → **New Deployment**:
   *   Select type: **Web app**
   *   Execute as: **Me**
   *   Who has access: **Anyone**
6. Copy the generated Web App URL and set it as `GOOGLE_SCRIPT_URL` in your environment files.

---

## ✉️ Automated RSVP Confirmation Emails

The application is configured to automatically send modern, styled confirmation HTML emails using Nodemailer. 
*   To enable this, make sure to set `EMAIL_USER` (your Gmail address) and `EMAIL_PASS` (a Gmail App Password generated via your Google Account Settings under 2-Step Verification).
*   The email matches the wedding palette, embeds the wedding invitation letter, and uses `cid` inline attachments to load theme backgrounds.
