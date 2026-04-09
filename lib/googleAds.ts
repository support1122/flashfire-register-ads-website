/**
 * Google Ads + GA4 helpers — aligned with flashfire-webiste-frontend-nextjs-main/lib/googleAds.ts
 */

export const GOOGLE_ADS_CONVERSION_ID =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID) ||
  "";

export const GA4_MEASUREMENT_ID =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_GA_MEASUREMENT_ID) ||
  "G-4P890VGD8D";

export const pageview = () => {
  if (typeof window !== "undefined" && window.gtag && GOOGLE_ADS_CONVERSION_ID) {
    window.gtag("event", "page_view", {
      send_to: GOOGLE_ADS_CONVERSION_ID,
    });
  }
};

export const event = (eventName: string, options: Record<string, unknown> = {}) => {
  if (typeof window !== "undefined" && window.gtag && GOOGLE_ADS_CONVERSION_ID) {
    window.gtag("event", eventName, {
      send_to: GOOGLE_ADS_CONVERSION_ID,
      ...options,
    });
  }
};

export const conversion = (
  conversionLabel: string,
  options: Record<string, unknown> = {},
) => {
  if (typeof window !== "undefined" && window.gtag && GOOGLE_ADS_CONVERSION_ID) {
    const sendTo = `${GOOGLE_ADS_CONVERSION_ID}/${conversionLabel}`;
    window.gtag("event", "conversion", {
      send_to: sendTo,
      ...options,
    });
  }
};

export const trackSchedule = (options: {
  value?: number;
  currency?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  transactionId?: string;
  [key: string]: unknown;
} = {}) => {
  const {
    value = 0,
    currency = "USD",
    email,
    firstName,
    lastName,
    transactionId,
    ...rest
  } = options;

  if (typeof window !== "undefined" && window.gtag && (email || firstName || lastName)) {
    window.gtag("set", "user_data", {
      ...(email && { email: String(email).toLowerCase() }),
      ...(firstName && { first_name: firstName }),
      ...(lastName && { last_name: lastName }),
    });
  }

  conversion("LSPpCLKsj5AcEOLL8J1C", {
    value,
    currency,
    transaction_id: transactionId,
    ...rest,
  });
};

export const trackMeetingBooked = (
  options: Parameters<typeof trackSchedule>[0] = {},
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "meeting_booked", {
      send_to: GA4_MEASUREMENT_ID,
      page_path: "/meeting-booked",
    });
  }
  trackSchedule(options);
};

export const trackLead = (options: {
  value?: number;
  currency?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  transactionId?: string;
  [key: string]: unknown;
} = {}) => {
  const {
    value = 0,
    currency = "USD",
    email,
    firstName,
    lastName,
    transactionId,
    ...rest
  } = options;

  conversion("lead_form", {
    value,
    currency,
    transaction_id: transactionId,
    ...(email && { email_address: String(email).toLowerCase() }),
    ...(firstName && { first_name: firstName }),
    ...(lastName && { last_name: lastName }),
    ...rest,
  });
};

export const trackPurchase = (options: {
  value: number;
  currency?: string;
  transactionId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  [key: string]: unknown;
}) => {
  const {
    value,
    currency = "USD",
    transactionId,
    email,
    firstName,
    lastName,
    ...rest
  } = options;

  conversion("purchase", {
    value,
    currency,
    transaction_id: transactionId,
    ...(email && { email_address: String(email).toLowerCase() }),
    ...(firstName && { first_name: firstName }),
    ...(lastName && { last_name: lastName }),
    ...rest,
  });
};
