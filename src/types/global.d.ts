export {};

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, unknown>,
    ) => void;
    dataLayer?: unknown[];
    fbq?: (
      command: "init" | "track" | string,
      eventName?: string,
      params?: Record<string, unknown>,
    ) => void;
    _fbq?: unknown;
    lintrk?: ((
      command: "track" | string,
      params?: Record<string, unknown>,
    ) => void) & {
      q?: Array<[string, Record<string, unknown>]>;
    };
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
  }
}
