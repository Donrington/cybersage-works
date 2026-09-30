// Motion tokens shared by every client leaf. Durations are in seconds (Motion).
// Anything a user triggers repeatedly stays at or under 300ms.

export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;

export const DUR = {
  press: 0.1,
  hover: 0.16,
  state: 0.2,
  wipe: 0.26,
  panel: 0.3,
  reveal: 0.6,
} as const;
