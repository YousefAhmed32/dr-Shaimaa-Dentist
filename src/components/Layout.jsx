import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";
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
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={pathname}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: .32, ease: [.22, 1, .36, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
}
