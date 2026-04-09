export const LINKEDIN_PARTNER_ID =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_LINKEDIN_PARTNER_ID) || "";

export const pageview = () => {
  if (typeof window !== "undefined" && window.lintrk && LINKEDIN_PARTNER_ID) {
    /* Insight tag handles pageviews when loaded */
  }
};

export const trackConversion = (conversionId: string, options: Record<string, unknown> = {}) => {
  if (typeof window !== "undefined" && window.lintrk && LINKEDIN_PARTNER_ID) {
    window.lintrk("track", {
      conversion_id: conversionId,
      ...options,
    });
  }
};

export const event = (conversionId: string, options: Record<string, unknown> = {}) => {
  trackConversion(conversionId, options);
};

export const trackLead = (
  conversionId: string,
  options: {
    value?: number;
    currency?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    transactionId?: string;
    [key: string]: unknown;
  } = {},
) => {
  const {
    value = 0,
    currency = "USD",
    email,
    firstName,
    lastName,
    transactionId,
    ...rest
  } = options;

  trackConversion(conversionId, {
    value,
    currency,
    transaction_id: transactionId,
    ...(email && { email_address: String(email).toLowerCase() }),
    ...(firstName && { first_name: firstName }),
    ...(lastName && { last_name: lastName }),
    ...rest,
  });
};

export const trackSchedule = (
  conversionId: string,
  options: {
    value?: number;
    currency?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    transactionId?: string;
    [key: string]: unknown;
  } = {},
) => {
  const {
    value = 0,
    currency = "USD",
    email,
    firstName,
    lastName,
    transactionId,
    ...rest
  } = options;

  trackConversion(conversionId, {
    value,
    currency,
    transaction_id: transactionId,
    ...(email && { email_address: String(email).toLowerCase() }),
    ...(firstName && { first_name: firstName }),
    ...(lastName && { last_name: lastName }),
    ...rest,
  });
};

export const trackPurchase = (
  conversionId: string,
  options: {
    value: number;
    currency?: string;
    transactionId: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    [key: string]: unknown;
  },
) => {
  const {
    value,
    currency = "USD",
    transactionId,
    email,
    firstName,
    lastName,
    ...rest
  } = options;

  trackConversion(conversionId, {
    value,
    currency,
    transaction_id: transactionId,
    ...(email && { email_address: String(email).toLowerCase() }),
    ...(firstName && { first_name: firstName }),
    ...(lastName && { last_name: lastName }),
    ...rest,
  });
};

export const trackSignUp = (
  conversionId: string,
  options: {
    value?: number;
    currency?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    [key: string]: unknown;
  } = {},
) => {
  const {
    value = 0,
    currency = "USD",
    email,
    firstName,
    lastName,
    ...rest
  } = options;

  trackConversion(conversionId, {
    value,
    currency,
    ...(email && { email_address: String(email).toLowerCase() }),
    ...(firstName && { first_name: firstName }),
    ...(lastName && { last_name: lastName }),
    ...rest,
  });
};
