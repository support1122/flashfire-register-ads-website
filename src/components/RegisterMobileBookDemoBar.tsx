"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import styles from "./RegisterMobileBookDemoBar.module.css";

const BOOK_LABEL = "Book a Demo →";

export default function RegisterMobileBookDemoBar() {
  const pathname = usePathname();
  const safePathname =
    pathname || (typeof window !== "undefined" ? window.location.pathname : "") || "";

  const showBar =
    safePathname === "/register" || safePathname === "/register/book-a-demo";

  const handleBookDemo = useCallback(() => {
    if (typeof window === "undefined") return;

    const utmSource = localStorage.getItem("utm_source") || "WEBSITE";
    const utmMedium =
      localStorage.getItem("utm_medium") || "Navigation_Navbar_Button";
    const utmCampaign = localStorage.getItem("utm_campaign") || "Website";

    GTagUTM({
      eventName: "whatsapp_support_click",
      label: "Navbar_Book_A_Demo_Button_Mobile_Bottom_Bar",
      utmParams: {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
      },
    });

    trackButtonClick("Book a Demo", "navigation", "cta", {
      button_location: "navbar_mobile_bottom_bar",
      navigation_type: "primary_cta",
      page: "book-a-demo",
    });

    trackSignupIntent("book_a_demo_mobile_bottom_bar", {
      signup_source: "navbar_mobile_bottom_bar",
      funnel_stage: "signup_intent",
      target_url: "/register/book-a-demo",
    });

    const currentPath = safePathname || window.location.pathname;
    sessionStorage.setItem("previousPageBeforeBookADemo", currentPath);
    const currentScrollY = window.scrollY || window.pageYOffset || 0;
    sessionStorage.setItem("preserveScrollPosition", String(currentScrollY));

    window.dispatchEvent(new CustomEvent("showCalendlyModal"));
  }, [safePathname]);

  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showCalendlyModal"));
      }
    },
  });

  if (!showBar) {
    return null;
  }

  return (
    <div className={styles.stickyBar}>
      <button
        type="button"
        className={styles.primary}
        {...getButtonProps()}
        onClick={handleBookDemo}
      >
        {BOOK_LABEL}
      </button>
    </div>
  );
}
