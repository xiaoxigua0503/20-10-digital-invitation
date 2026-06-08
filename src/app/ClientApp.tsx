"use client";

import { useEffect, useMemo, useState } from "react";
import { IntroEnvelope } from "@/components/IntroEnvelope";
import { AudioPlayer } from "@/components/AudioPlayer";
import { StickyNav } from "@/components/StickyNav";
import { HeroSection } from "@/sections/HeroSection";
import { CountdownSection } from "@/sections/CountdownSection";
import { StorySection } from "@/sections/StorySection";
import { TimelineSection } from "@/sections/TimelineSection";
import { EntourageSection } from "@/sections/EntourageSection";
import { DressCodeSection } from "@/sections/DressCodeSection";
import { DetailsSection } from "@/sections/DetailsSection";
import { VenueSection } from "@/sections/VenueSection";
import { GallerySection } from "@/sections/GallerySection";
import { GiftRegistrySection } from "@/sections/GiftRegistrySection";
import { FaqSection } from "@/sections/FaqSection";
import { RsvpSection } from "@/sections/RsvpSection";
import { ContactSection } from "@/sections/ContactSection";
import { FooterSection } from "@/sections/FooterSection";

export function ClientApp() {
  const [entered, setEntered] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);

  const nav = useMemo(
    () => [
      { id: "countdown", label: "Countdown" },
      { id: "story", label: "Our Story" },
      { id: "timeline", label: "Timeline" },
      { id: "entourage", label: "Entourage" },
      { id: "dress-code", label: "Dress Code" },
      { id: "venues", label: "Venues" },
      { id: "gallery", label: "Gallery" },
      { id: "faq", label: "FAQ" },
      { id: "rsvp", label: "RSVP" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.overflow;
    if (!entered) el.style.overflow = "hidden";
    return () => {
      el.style.overflow = prev;
    };
  }, [entered]);

  return (
    <>
      <StickyNav visible={entered} items={nav} />
      <AudioPlayer enabled={musicEnabled} src="/audio/piano.mp3" />

      {!entered ? (
        <IntroEnvelope
          onUserGesture={() => setMusicEnabled(true)}
          onComplete={() => setEntered(true)}
        />
      ) : null}

      <main className="flex-1">
        <HeroSection
          onRsvp={() =>
            document.getElementById("rsvp")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        />
        <CountdownSection />
        <StorySection />
        <TimelineSection />
        <EntourageSection />
        <DressCodeSection />
        <DetailsSection />
        <VenueSection />
        <GallerySection />
        <GiftRegistrySection />
        <FaqSection />
        <RsvpSection />
        <ContactSection />
        <FooterSection />
      </main>
    </>
  );
}
