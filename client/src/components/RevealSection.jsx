import { motion, useReducedMotion } from "motion/react";

export default function RevealSection({ direction = "right", className = "", children, ...props }) {
  const reduceMotion = useReducedMotion();
  const fromRight = direction === "right";

  return (
    <motion.section
      className={`reveal-section ${className}`}
      initial={reduceMotion ? false : {
        opacity: .08,
        x: fromRight ? 64 : -64,
        clipPath: fromRight ? "inset(0 0 0 12%)" : "inset(0 12% 0 0)",
      }}
      whileInView={{ opacity: 1, x: 0, clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, amount: .12, margin: "0px 0px -8% 0px" }}
      transition={{ duration: .82, ease: [.16, 1, .3, 1] }}
      {...props}
    >
      {children}
    </motion.section>
  );
}
