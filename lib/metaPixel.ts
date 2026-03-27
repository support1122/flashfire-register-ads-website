/** Same default pixel as main site; override with NEXT_PUBLIC_FB_PIXEL_ID on Vercel. */
export const FB_PIXEL_ID =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_FB_PIXEL_ID) ||
  "1400368301319082";

export const pageview = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }
};

export const event = (name: string, options: Record<string, unknown> = {}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", name, options);
  }
};
