// Card.tsx
import React from "react";
import { motion, Variants } from "framer-motion";

interface Props {
  text: string;
  hueA: number;
  hueB: number;
}

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

const Card: React.FC<Props> = ({ text, hueA, hueB }) => {
  const borderColor = `hsl(${hueA}, 100%, 50%)`; // Border color based on hueA

  return (
    <motion.div
      className="overflow flex items-center justify-center relative pt-5 -mb-28"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.div
        className="text-2xl font-semibold w-[320px] h-[400px] flex items-center justify-center rounded-3xl bg-white border-[14px]"
        variants={cardVariants}
        style={{ borderColor }}
      >
        {text}
      </motion.div>
    </motion.div>
  );
};

export default Card;
