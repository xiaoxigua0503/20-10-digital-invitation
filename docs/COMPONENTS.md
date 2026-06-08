## Editable Content
- Wedding details, entourage, timeline, FAQ, and gallery prompts: [wedding.ts](file:///c:/Projects/wedding-rsvp-trae/src/lib/wedding.ts)
- Generated image URLs: [images.ts](file:///c:/Projects/wedding-rsvp-trae/src/lib/images.ts)
- Audio file: place `public/audio/piano.mp3` (see [public/audio/README.md](file:///c:/Projects/wedding-rsvp-trae/public/audio/README.md))

## Key App Structure
- Page entry: [page.tsx](file:///c:/Projects/wedding-rsvp-trae/src/app/page.tsx)
- Client orchestrator (intro → site): [ClientApp.tsx](file:///c:/Projects/wedding-rsvp-trae/src/app/ClientApp.tsx)

## Components
- Intro envelope animation: [IntroEnvelope.tsx](file:///c:/Projects/wedding-rsvp-trae/src/components/IntroEnvelope.tsx)
- Sticky navigation: [StickyNav.tsx](file:///c:/Projects/wedding-rsvp-trae/src/components/StickyNav.tsx)
- Music toggle / audio: [AudioPlayer.tsx](file:///c:/Projects/wedding-rsvp-trae/src/components/AudioPlayer.tsx)
- Section wrapper: [Section.tsx](file:///c:/Projects/wedding-rsvp-trae/src/components/Section.tsx)
- Scroll reveal: [Reveal.tsx](file:///c:/Projects/wedding-rsvp-trae/src/components/Reveal.tsx)
- Accordion: [Accordion.tsx](file:///c:/Projects/wedding-rsvp-trae/src/components/Accordion.tsx)
- Maps: [MapEmbed.tsx](file:///c:/Projects/wedding-rsvp-trae/src/components/MapEmbed.tsx)
- RSVP form fields: [Field.tsx](file:///c:/Projects/wedding-rsvp-trae/src/components/Field.tsx), [Button.tsx](file:///c:/Projects/wedding-rsvp-trae/src/components/Button.tsx)

## Sections
- Hero: [HeroSection.tsx](file:///c:/Projects/wedding-rsvp-trae/src/sections/HeroSection.tsx)
- Countdown: [CountdownSection.tsx](file:///c:/Projects/wedding-rsvp-trae/src/sections/CountdownSection.tsx)
- Our Story: [StorySection.tsx](file:///c:/Projects/wedding-rsvp-trae/src/sections/StorySection.tsx)
- Wedding Timeline: [TimelineSection.tsx](file:///c:/Projects/wedding-rsvp-trae/src/sections/TimelineSection.tsx)
- Entourage: [EntourageSection.tsx](file:///c:/Projects/wedding-rsvp-trae/src/sections/EntourageSection.tsx)
- Dress Code: [DressCodeSection.tsx](file:///c:/Projects/wedding-rsvp-trae/src/sections/DressCodeSection.tsx)
- Details: [DetailsSection.tsx](file:///c:/Projects/wedding-rsvp-trae/src/sections/DetailsSection.tsx)
- Venues + maps: [VenueSection.tsx](file:///c:/Projects/wedding-rsvp-trae/src/sections/VenueSection.tsx)
- Gallery: [GallerySection.tsx](file:///c:/Projects/wedding-rsvp-trae/src/sections/GallerySection.tsx)
- Gift Registry: [GiftRegistrySection.tsx](file:///c:/Projects/wedding-rsvp-trae/src/sections/GiftRegistrySection.tsx)
- FAQ: [FaqSection.tsx](file:///c:/Projects/wedding-rsvp-trae/src/sections/FaqSection.tsx)
- RSVP: [RsvpSection.tsx](file:///c:/Projects/wedding-rsvp-trae/src/sections/RsvpSection.tsx)
- Contact: [ContactSection.tsx](file:///c:/Projects/wedding-rsvp-trae/src/sections/ContactSection.tsx)
- Footer: [FooterSection.tsx](file:///c:/Projects/wedding-rsvp-trae/src/sections/FooterSection.tsx)

## RSVP Backend
- Next.js API routes:
  - [api/rsvp/route.ts](file:///c:/Projects/wedding-rsvp-trae/src/app/api/rsvp/route.ts)
  - [api/rsvp/lookup/route.ts](file:///c:/Projects/wedding-rsvp-trae/src/app/api/rsvp/lookup/route.ts)
- Apps Script:
  - [apps-script/Code.gs](file:///c:/Projects/wedding-rsvp-trae/apps-script/Code.gs)
