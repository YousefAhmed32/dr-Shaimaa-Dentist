import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";
import WhatsAppFloat from "./WhatsAppFloat";
import { useLanguage } from "../context/LanguageContext";

export default function Layout() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <>
      <SmoothScroll />
      <a className="skip-link" href="#main">{t.skip}</a>
      <Header />
      <motion.main
        id="main"
        key={pathname}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: .22, ease: [.22, 1, .36, 1] }}
      >
        <Outlet />
      </motion.main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
