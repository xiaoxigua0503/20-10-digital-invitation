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
  "/gallery/pre-wed2.png",
  textToImageUrl(
    "luxury bohemian wedding flat lay, silk ribbon, wax seal, vintage paper texture, soft natural light, warm creamy peach tones, dusty rose florals, editorial photography, high detail, shallow depth of field",
    "portrait_4_3"
  ),
  textToImageUrl(
    "romantic vintage wedding stationery, engraved monogram, floral arrangement, muted dusty blue accents, airy warm lighting, film grain, editorial",
    "portrait_4_3"
  ),
  textToImageUrl(
    "earthy romantic bouquet detail, terracotta and dusty rose flowers, soft cream background, warm airy mood, premium editorial photo",
    "portrait_4_3"
  ),
  textToImageUrl(
    "wedding rings on textured linen, subtle bokeh, deep burgundy accent ribbon, warm sophisticated light, cinematic",
    "portrait_4_3"
  ),
] as const;
