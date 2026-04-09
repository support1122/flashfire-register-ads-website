"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";
import GeoBlockModal from "@/src/components/modals/GeoBlockModal";
import GeoBypassSuccessModal from "@/src/components/modals/GeoBypassSuccessModal";
import CalendlyModal from "@/src/components/calendlyModal/CalendlyModal";
import { warmCalendly } from "@/src/utils/calendlyWarmup";
import { loadFormData } from "@/src/utils/LocalStorageUtils";

function RegisterCalendlyGeoInner({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [showGeoBlockModal, setShowGeoBlockModal] = useState(false);
  const [isFromIndia, setIsFromIndia] = useState(false);
  const [geoLoading, setGeoLoading] = useState(true);

  const [showCalendlyModal, setShowCalendlyModal] = useState(false);
  const [forceShowCalendlyModal, setForceShowCalendlyModal] = useState(false);
  const [geoBypassActive, setGeoBypassActive] = useState(false);
  const [showBypassSuccessModal, setShowBypassSuccessModal] = useState(false);

  useEffect(() => {
    warmCalendly();
  }, []);

  useEffect(() => {
    const detectCountry = () => {
      try {
        setGeoLoading(true);
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const language = navigator.language || navigator.languages?.[0];

        let isIndiaDetected = false;

        if (
          timezone.includes("Asia/Kolkata") ||
          timezone.includes("Asia/Calcutta")
        ) {
          isIndiaDetected = true;
        }

        if (
          language.startsWith("hi") ||
          language.startsWith("bn") ||
          language.startsWith("te") ||
          language.startsWith("ta") ||
          language.startsWith("gu") ||
          language.startsWith("kn") ||
          language.startsWith("ml") ||
          language.startsWith("pa") ||
          language.startsWith("or")
        ) {
          isIndiaDetected = true;
        }

        const params = new URLSearchParams(window.location.search);
        if (params.get("test_india") === "true") {
          isIndiaDetected = true;
        }

        setIsFromIndia(isIndiaDetected);
      } catch (error) {
        console.error("Geo detection failed:", error);
      } finally {
        setGeoLoading(false);
      }
    };

    detectCountry();
  }, []);

  useEffect(() => {
    const handleCalendlyModal = () => {
      setForceShowCalendlyModal(true);
    };

    const handleGeoBypass = () => {
      setGeoBypassActive(true);
      setShowGeoBlockModal(false);
      setShowBypassSuccessModal(true);
    };

    const handleShowBypassSuccess = () => {
      setShowBypassSuccessModal(true);
    };

    window.addEventListener("showCalendlyModal", handleCalendlyModal);
    window.addEventListener("bypassGeoBlock", handleGeoBypass);
    window.addEventListener("showGeoBypassSuccess", handleShowBypassSuccess);

    return () => {
      window.removeEventListener("showCalendlyModal", handleCalendlyModal);
      window.removeEventListener("bypassGeoBlock", handleGeoBypass);
      window.removeEventListener("showGeoBypassSuccess", handleShowBypassSuccess);
    };
  }, []);

  useEffect(() => {
    if (!forceShowCalendlyModal) return;

    setForceShowCalendlyModal(false);

    const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;

    if (!geoLoading && isFromIndia && !geoBypassActive) {
      setShowGeoBlockModal(true);
      setShowCalendlyModal(false);
    } else {
      setShowCalendlyModal(true);
      setShowGeoBlockModal(false);
    }

    if (typeof window !== "undefined" && currentScrollY > 0) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: currentScrollY, behavior: "instant" });
        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: "instant" });
          setTimeout(() => {
            window.scrollTo({ top: currentScrollY, behavior: "instant" });
          }, 100);
        });
      });
    }
  }, [forceShowCalendlyModal, geoLoading, isFromIndia, geoBypassActive]);

  useEffect(() => {
    if (!showCalendlyModal) return;
    if (pathname !== "/register/book-a-demo") {
      router.replace("/register/book-a-demo", { scroll: false });
    }
  }, [showCalendlyModal, pathname, router]);

  const handleGeoBlockModalClose = () => {
    setShowGeoBlockModal(false);
  };

  const handleCalendlyModalClose = () => {
    setShowCalendlyModal(false);
    if (pathname === "/register/book-a-demo") {
      router.replace("/register", { scroll: false });
    }
  };

  const savedFormData = loadFormData();

  return (
    <>
      {children}
      <GeoBlockModal
        isVisible={showGeoBlockModal}
        onClose={handleGeoBlockModalClose}
      />
      <GeoBypassSuccessModal
        isVisible={showBypassSuccessModal}
        onClose={() => setShowBypassSuccessModal(false)}
      />
      <CalendlyModal
        isVisible={showCalendlyModal}
        onClose={handleCalendlyModalClose}
        user={{
          fullName: savedFormData.fullName || "",
          email: savedFormData.email || "",
          phone: savedFormData.phone || "",
          countryCode: savedFormData.countryCode || "",
        }}
      />
    </>
  );
}

export default function RegisterCalendlyGeoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<>{children}</>}>
      <RegisterCalendlyGeoInner>{children}</RegisterCalendlyGeoInner>
    </Suspense>
  );
}
