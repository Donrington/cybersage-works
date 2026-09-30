// Inline 24px line icons (no icon dependency). Decorative by default: the
// control that holds an icon carries the accessible name.
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 18, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const ArrowUpRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 17 17 7M8.5 7H17v8.5" />
  </Svg>
);

export const ArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" />
  </Svg>
);

export const Download = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14" />
  </Svg>
);

export const Expand = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14.5 4H20v5.5M9.5 20H4v-5.5M20 4l-6.5 6.5M4 20l6.5-6.5" />
  </Svg>
);

export const CaretLeft = (p: IconProps) => (
  <Svg {...p}>
    <path d="M15 5.5 8.5 12l6.5 6.5" />
  </Svg>
);

export const CaretRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 5.5 15.5 12 9 18.5" />
  </Svg>
);

export const Close = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const Check = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);

export const Plus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const GitHub = ({ size = 18, ...rest }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...rest}>
    <path d="M12 2.25a9.75 9.75 0 0 0-3.08 19c.49.09.67-.21.67-.47v-1.66c-2.71.59-3.28-1.31-3.28-1.31-.44-1.13-1.08-1.43-1.08-1.43-.88-.6.07-.59.07-.59.98.07 1.49 1 1.49 1 .87 1.49 2.28 1.06 2.84.81.09-.63.34-1.06.62-1.3-2.16-.25-4.44-1.08-4.44-4.81 0-1.06.38-1.93 1-2.61-.1-.25-.43-1.24.1-2.58 0 0 .82-.26 2.68 1a9.3 9.3 0 0 1 4.88 0c1.86-1.26 2.68-1 2.68-1 .53 1.34.2 2.33.1 2.58.62.68 1 1.55 1 2.61 0 3.74-2.28 4.56-4.45 4.8.35.3.66.9.66 1.82v2.69c0 .26.18.57.68.47A9.75 9.75 0 0 0 12 2.25Z" />
  </svg>
);
