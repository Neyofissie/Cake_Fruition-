import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 18, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    focusable: false,
    ...props,
  } as const;
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.22 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23a7.4 7.4 0 0 1-1.38-1.72c-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="none" stroke="currentColor" strokeWidth={1.4}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor">
      <path d="M13.5 21v-7.6h2.55l.38-2.96H13.5V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46a21 21 0 0 0-2.29-.12c-2.27 0-3.82 1.38-3.82 3.92v2.18H7.87v2.96h2.56V21h3.07Z" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h15.5M14 6.5 19.5 12 14 17.5" />
    </svg>
  );
}

/** Four-point star used as the brand's sparkle motif. */
export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor">
      <path d="M12 1.5c.4 4.9 1.6 8.2 3.4 9.1 1.4.7 3.7 1.1 7.1 1.4-3.4.3-5.7.7-7.1 1.4-1.8.9-3 4.2-3.4 9.1-.4-4.9-1.6-8.2-3.4-9.1-1.4-.7-3.7-1.1-7.1-1.4 3.4-.3 5.7-.7 7.1-1.4 1.8-.9 3-4.2 3.4-9.1Z" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round">
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

export function ChevronIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}
