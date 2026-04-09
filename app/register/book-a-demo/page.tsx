"use client";

import { useEffect } from "react";
import RegisterLandingPage from "@/src/components/RegisterLandingPage";

export default function BookADemoPage() {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("showCalendlyModal"));
  }, []);

  return <RegisterLandingPage />;
}
