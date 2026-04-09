"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureUTMParams } from "@/src/utils/captureUTMParams";
import { apiUrl } from "@/src/utils/apiBase";
import * as fbq from "@/lib/metaPixel";
import * as linkedin from "@/lib/linkedinInsightTag";

/**
 * Mirrors main website: UTM + campaign visit, MongoDB page visits via backend,
 * optional PostHog when NEXT_PUBLIC_POSTHOG_KEY is set.
 */
function RegisterWebAnalyticsInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthogInitRef = useRef(false);

  useEffect(() => {
    captureUTMParams();
  }, [searchParams]);

  useEffect(() => {
    if (!pathname || typeof window === "undefined") return;

    let url = window.origin + pathname;
    if (searchParams?.toString()) {
      url = `${url}?${searchParams.toString()}`;
    }

    const utmSource =
      localStorage.getItem("utm_source") ||
      new URLSearchParams(window.location.search).get("utm_source");
    const utmMedium =
      localStorage.getItem("utm_medium") ||
      new URLSearchParams(window.location.search).get("utm_medium");
    const utmCampaign =
      localStorage.getItem("utm_campaign") ||
      new URLSearchParams(window.location.search).get("utm_campaign");
    const utmContent =
      localStorage.getItem("utm_content") ||
      new URLSearchParams(window.location.search).get("utm_content");
    const utmTerm =
      localStorage.getItem("utm_term") ||
      new URLSearchParams(window.location.search).get("utm_term");

    let sessionId = sessionStorage.getItem("session_id");
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      sessionStorage.setItem("session_id", sessionId);
    }

    let visitorId = localStorage.getItem("visitor_id");
    if (!visitorId) {
      visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      localStorage.setItem("visitor_id", visitorId);
    }

    const countryCode = localStorage.getItem("ff_country_code_v1") || "US";

    fbq.pageview();
    linkedin.pageview();

    fetch(apiUrl("/api/track/page-visit"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId,
        pageUrl: url,
        referrer: document.referrer || null,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
        utmContent: utmContent || null,
        utmTerm: utmTerm || null,
        sessionId,
        metadata: {
          pathname,
          searchParams: searchParams?.toString() || null,
          countryCode,
          app: "register_landing",
        },
      }),
    }).catch(() => {});

    const phKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (phKey && typeof window !== "undefined") {
      void import("posthog-js").then((posthog) => {
        const host =
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
        if (!posthogInitRef.current) {
          posthog.default.init(phKey, {
            api_host: host,
            autocapture: true,
            capture_pageview: false,
          });
          posthogInitRef.current = true;
        }
        posthog.default.capture("$pageview", {
          $current_url: url,
          utm_source: utmSource || "direct",
          utm_medium: utmMedium || "website",
          utm_campaign: utmCampaign || "organic",
          app: "register_landing",
        });
      });
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
}

export default function RegisterWebAnalytics({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<>{children}</>}>
      <RegisterWebAnalyticsInner>{children}</RegisterWebAnalyticsInner>
    </Suspense>
  );
}
