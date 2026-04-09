import { apiUrl } from "@/src/utils/apiBase";

/**
 * Same behavior as flashfire-webiste-frontend-nextjs-main: persist UTMs, visitor_id,
 * POST /api/campaigns/track/visit when utm_source is present, optional ref tracking.
 */
export function captureUTMParams(): void {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");

  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");
  const utmContent = params.get("utm_content");
  const utmTerm = params.get("utm_term");

  if (utmSource) {
    localStorage.setItem("utm_source", utmSource);
  }
  if (utmMedium) {
    localStorage.setItem("utm_medium", utmMedium);
  }
  if (utmCampaign) {
    localStorage.setItem("utm_campaign", utmCampaign);
  }
  if (utmContent) {
    localStorage.setItem("utm_content", utmContent);
  }
  if (utmTerm) {
    localStorage.setItem("utm_term", utmTerm);
  }

  let visitorId = localStorage.getItem("visitor_id");
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    localStorage.setItem("visitor_id", visitorId);
  }

  if (utmSource) {
    fetch(apiUrl("/api/campaigns/track/visit"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        utmSource,
        visitorId,
        userAgent: navigator.userAgent,
        ipAddress: null,
        referrer: document.referrer,
        pageUrl: window.location.href,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.error("Campaign visit tracking failed:", err));
  }

  if (ref) {
    const refEndpoint =
      process.env.NEXT_PUBLIC_REF_TRACKING_URL ||
      "https://clients-tracking-backend.onrender.com/api/track";

    const payload = {
      ref,
      userAgent: navigator.userAgent,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    fetch(refEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data: { ok?: boolean; utm_source?: string; message?: string }) => {
        if (data.ok) {
          if (!localStorage.getItem("utm_source") && data.utm_source) {
            localStorage.setItem("utm_source", data.utm_source);
          }
          localStorage.setItem("ref-code", ref);
        } else {
          console.warn("Ref tracking:", data.message);
        }
      })
      .catch((err) => console.error("Ref tracking failed:", err));
  }
}
