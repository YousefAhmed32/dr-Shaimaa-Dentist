import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { getWhatsAppHref } from "../data/contact";

export default function WhatsAppFloat() {
  const { t, isArabic } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      className="whatsapp-float"
      href={getWhatsAppHref(isArabic)}
      target="_blank"
      rel="noreferrer"
      aria-label={t.common.whatsappCta}
      initial={reduceMotion ? false : { opacity: 0, scale: .78, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 19, delay: .55 }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      whileTap={reduceMotion ? undefined : { scale: .96 }}
    >
      <span className="whatsapp-pulse" aria-hidden="true" />
      <MessageCircle aria-hidden="true" />
      <span>{t.common.whatsapp}</span>
    </motion.a>
  );
}
