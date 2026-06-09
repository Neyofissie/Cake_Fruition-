import React, { useState } from "react";
import defaultLogo from "../assets/images/cake_fruition_logo_8k.png";

interface LogoProps {
  variant?: "horizontal" | "vertical" | "icon";
  theme?: "light" | "dark" | "default";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  src?: string;
}

export default function Logo({
  variant = "horizontal",
  theme = "default",
  size = "md",
  className = "",
  src = defaultLogo,
}: LogoProps) {
  const [imageError, setImageError] = useState(false);
  // Determine color styling based on the theme prop
  const themeClasses = {
    default: "text-primary-black hover:text-charcoal transition-colors duration-300",
    light: "text-primary-black hover:text-charcoal transition-colors duration-300",
    dark: "text-white hover:text-light-grey transition-colors duration-300",
  };

  const selectedThemeClass = themeClasses[theme];

  // Icon sizing
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const selectedIconSize = iconSizes[size];

  // SVG representation of the brand mark:
  // A circular stamp containing an elegant line-art leaf and pear branch (the "Fruition")
  const brandCrestIcon = (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`${selectedIconSize} flex-shrink-0`}
      aria-hidden="true"
    >
      {/* Outer minimalist circle border */}
      <circle
        cx="32"
        cy="32"
        r="29"
        strokeWidth="1"
        strokeDasharray="64 1"
        className="opacity-95"
      />
      {/* Inner subtle concentric guideline */}
      <circle
        cx="32"
        cy="32"
        r="26.5"
        strokeWidth="0.5"
        strokeOpacity="0.25"
      />
      
      {/* Handcrafted Stem & Leaf branch */}
      <path
        d="M32 17 C33 17, 34 13.5, 36.5 11"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M35 12.5 C30 11, 23 15, 24.5 19 C28.5 18, 33 17, 35 12.5 Z"
        fill="currentColor"
        fillOpacity="0.08"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      
      {/* The Fruition Pear Body */}
      <path
        d="M32 19.5 C29.5 19.5, 27 22, 26 26.5 C25 31, 20.5 34, 20.5 39 C20.5 45.5, 25.5 50.5, 32 50.5 C38.5 50.5, 43.5 45.5, 43.5 39 C43.5 34, 39 31, 38 26.5 C37 22, 34.5 19.5, 32 19.5 Z"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.04"
      />

      {/* Decorative premium star/sparkle representing the "sweet magic" */}
      <path
        d="M48 20 L49.5 22.5 L52 23 L49.5 23.5 L48 26 L46.5 23.5 L44 23 L46.5 22.5 Z"
        fill="currentColor"
        stroke="none"
        className="animate-[pulse_4s_infinite_ease-in-out]"
      />
    </svg>
  );

  const renderCrest = () => {
    if (src && !imageError) {
      return (
        <img
          src={src}
          alt="Cake Fruition Brand Logo"
          className={`${selectedIconSize} rounded-full object-cover border border-muted-border/30 flex-shrink-0 bg-white shadow-sm`}
          referrerPolicy="no-referrer"
          onError={() => {
            setImageError(true);
          }}
        />
      );
    }
    return brandCrestIcon;
  };

  if (variant === "icon") {
    return (
      <div className={`inline-flex items-center justify-center ${selectedThemeClass} ${className}`}>
        {renderCrest()}
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={`flex flex-col items-center text-center gap-3 select-none group ${selectedThemeClass} ${className}`}>
        {renderCrest()}
        <div className="flex flex-col items-center">
          <span className="font-serif text-xl sm:text-2xl font-semibold tracking-[0.1em] uppercase text-current">
            Cake Fruition
          </span>
          <span className="font-sans text-[8px] tracking-[0.45em] uppercase opacity-75 mt-0.5 pl-0.5">
            Artisan Cake Studio
          </span>
        </div>
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`flex items-center gap-3.5 select-none group leading-none ${selectedThemeClass} ${className}`}>
      {renderCrest()}
      
      {/* Decorative thin vertical dividing line */}
      <div className="h-8 w-[1px] bg-muted-border/40 group-hover:bg-muted-border/80 transition-colors"></div>

      <div className="flex flex-col justify-center">
        <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.06em] uppercase text-current leading-none">
          Cake Fruition
        </span>
        <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-medium-grey group-hover:text-current transition-colors mt-1 pl-0.5">
          Artisan Cake Studio
        </span>
      </div>
    </div>
  );
}
