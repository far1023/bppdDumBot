import { Bot } from "lucide-react";

/**
 * BotAvatar — reusable gradient bot icon.
 *
 * Props:
 *   size   : "sm" | "md" | "lg"   (default: "md")
 *            sm = w-7 h-7 / icon w-4 h-4  → navbar logo
 *            md = w-8 h-8 / icon w-4 h-4  → chat message avatar
 *            lg = w-10 h-10 / icon w-5 h-5 → chat header avatar
 *
 *   shape  : "circle" | "square"  (default: "circle")
 *            circle = rounded-full
 *            square = rounded-md
 *
 *   className : extra classes appended to the wrapper (optional)
 */

const SIZE = {
  sm: { wrapper: "w-7 h-7",   icon: "w-4 h-4" },
  md: { wrapper: "w-8 h-8",   icon: "w-4 h-4" },
  lg: { wrapper: "w-10 h-10", icon: "w-5 h-5" },
};

export default function BotAvatar({ size = "md", shape = "circle", className = "" }) {
  const { wrapper, icon } = SIZE[size] ?? SIZE.md;
  const radius = shape === "square" ? "rounded-md" : "rounded-full";

  return (
    <div
      className={`flex-shrink-0 ${wrapper} ${radius} bg-gradient-to-tr from-[#F28B82] via-[#A8A5D7] to-[#5CB3F0] flex items-center justify-center ${className}`}
    >
      <Bot className={`${icon} text-white`} />
    </div>
  );
}
