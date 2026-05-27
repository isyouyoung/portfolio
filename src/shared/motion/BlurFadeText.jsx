import { motion } from "motion/react";

import { cn } from "@/shared/lib";

const BlurFadeText = ({
  text,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 8,
}) => {
  const defaultVariants = {
    hidden: { y: -yOffset, opacity: 0, filter: "blur(8px)" },
    visible: { y: 0, opacity: 1, filter: "blur(0px)" },
  };

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={variant || defaultVariants}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn("inline-block", className)}
    >
      {text}
    </motion.span>
  );
};

export default BlurFadeText;
