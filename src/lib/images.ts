type ImageSize =
  | "square_hd"
  | "square"
  | "portrait_4_3"
  | "portrait_16_9"
  | "landscape_4_3"
  | "landscape_16_9";

export function textToImageUrl(prompt: string, imageSize: ImageSize) {
  return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    prompt
  )}&image_size=${imageSize}`;
}

export const galleryImages = [
  "/gallery/pre-wed1.png",
  "/gallery/pre-wed2.JPEG",
  "/gallery/pre-wed310.JPEG",
  "/gallery/pre-wed4.JPG",
  "/gallery/pre-wed5.jpg",
  "/gallery/pre-wed6.JPG",
  "/gallery/pre-wed8.JPG",
  "/gallery/pre-wed9.JPEG",
] as const;
