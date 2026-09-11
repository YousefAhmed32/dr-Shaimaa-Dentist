export const PHONE_DISPLAY = "+20 111 881 4870";
export const PHONE_HREF = "tel:+201118814870";

export function getWhatsAppHref(isArabic) {
  const message = isArabic
    ? "مرحبًا د. شيماء، أود التواصل بخصوص فرصة مهنية أو تعاون مع العيادة."
    : "Hello Dr. Shaimaa, I would like to discuss a professional opportunity or clinic collaboration.";

  return `https://wa.me/201118814870?text=${encodeURIComponent(message)}`;
}
