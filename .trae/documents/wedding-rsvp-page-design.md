## 1. Page Structure (One-Page)
Sections (top → bottom):
1. Intro (Envelope)
2. Hero
3. Countdown
4. Our Story
5. Wedding Timeline
6. Entourage
7. Dress Code
8. Ceremony & Reception Details
9. Venue Maps
10. Photo Gallery
11. Gift Registry
12. FAQ
13. RSVP
14. Contact
15. Footer

## 2. Copy & Data (Editable)

### 2.1 Couple
- Bride: Christine Faner
- Groom: Angelo Pablo
- Date: June 19, 2026

### 2.2 Ceremony
- Location: Lokal ng Sandulayan
- District: Distrito ng San Jose Mindoro Occidental
- Address: Sto. Cristo, Rizal

### 2.3 Reception
- Venue: Grandiya's Venue Hall
- Address: Aroma Center, Gate 1, San Roque, San Jose, Occidental Mindoro

## 3. Intro Animation (Envelope → Invitation)
Target duration: ~5 seconds total.

Sequence:
1. Envelope idle: slight breathing motion + gentle light sweep across paper.
2. Tap/click: seal “gives” subtly; envelope flap opens with layered paper depth.
3. Card slides out upward with easing; soft shadow only as separation.
4. Card unfolds (two-step fold) to reveal the hero panel.
5. Transition: background shifts into site theme; sticky nav appears; scroll enabled.
6. Music starts after the user gesture (tap/click) with a visible mute toggle.

Motion rules:
- Prefer transform/opacity animations only (GPU-friendly).
- Respect `prefers-reduced-motion` by offering a “Skip animation” and reducing parallax.

## 4. Visual System

### 4.1 Tokens
- Background base: warm off-white with subtle grain overlay
- Accent ink: Deep Burgundy (#6C1613) for headings and key dividers
- Secondary accents: Dusty Rose (#D7A795), Terracotta (#F49C76), Muted Dusty Blue (#9CBCCF), Soft Creamy Peach (#FBCBA4)

### 4.2 Typography
- Display serif for names and section headings
- Clean sans for body, form labels, and utility text

## 5. RSVP UX
Requirements:
- Fields: Full Name, Email, Phone Number, Attending (Yes/No), Number of Guests, Message
- Validation: required fields, email format, phone format, guest count range
- Edit flow: guest enters email or phone → record displayed → can update and resubmit
States:
- Idle, Submitting, Success, Error, Not Found, Editing
Anti-spam:
- Honeypot field + timing threshold + server-side input validation
