"use client";

import Image from "next/image";
import { useCallback } from "react";
import FlashfireLogo from "@/src/components/FlashfireLogo";
import { registerHeroData } from "@/src/data/registerHero";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

const TRUST_AVATARS = [
  "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/amit%20(1).jpg",
  "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aman.jpg",
  "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/akrati.jpeg",
];

export default function RegisterHeroRightColumn() {
  const data = registerHeroData;

  const handleCta = useCallback(() => {
    if (typeof window === "undefined") return;
    const utmSource = localStorage.getItem("utm_source") || "WEBSITE";
    const utmMedium = localStorage.getItem("utm_medium") || "Hero_Section";

    GTagUTM({
      eventName: "sign_up_click",
      label: "Hero_Start_Button",
      utmParams: {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: localStorage.getItem("utm_campaign") || "Website",
      },
    });

    trackButtonClick("Get Started", "hero_cta", "cta", {
      button_location: "hero_main_cta",
      section: "hero_landing",
    });

    trackSignupIntent("hero_cta", {
      signup_source: "hero_main_button",
      funnel_stage: "signup_intent",
    });

    window.dispatchEvent(new CustomEvent("showCalendlyModal"));
  }, []);

  const { getButtonProps } = useGeoBypass({
    onBypass: handleCta,
  });

  return (
    <div className="relative mx-auto w-full min-w-0 max-w-[min(100%,40rem)] px-1 pb-3 pt-8 md:px-2 md:pt-0 md:pb-0 max-[480px]:pt-6">
        <div className="mb-7 mt-0 flex flex-wrap justify-center gap-2.5 max-[480px]:mb-4 max-[480px]:gap-2">
          {data.badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex min-h-[30px] items-center justify-center whitespace-nowrap rounded-none border-[0.5px] border-black px-3.5 py-1.5 text-center text-sm font-bold uppercase leading-tight tracking-[0.72px] text-[#F55D1D] opacity-100 max-[768px]:min-h-[26px] max-[768px]:px-2.5 max-[768px]:py-1 max-[768px]:text-xs max-[480px]:min-h-[24px] max-[480px]:px-2 max-[480px]:py-0.5 max-[480px]:text-[0.65rem]"
            >
              {badge}
            </span>
          ))}
        </div>

        <h1 className="mx-auto mb-5 w-full max-w-[900px] overflow-x-auto overflow-y-visible px-0 text-center font-bold leading-[1.15] tracking-[-0.02em] text-[1.6rem] text-black [scrollbar-width:none] sm:text-[2.1rem] md:text-[2.75rem] lg:text-[2.9rem] max-[480px]:mb-4 max-[480px]:px-1 [&::-webkit-scrollbar]:hidden">
          {/* Always exactly 3 lines — explicit rows + nowrap so width never changes line count */}
          <span className="block whitespace-nowrap px-0.5">
            {data.headlineLine1}
          </span>
          <span className="block whitespace-nowrap px-0.5 md:-mt-1">
            {data.headlineLine2}
          </span>
          <div className="-mt-1 flex w-full flex-nowrap items-center justify-center gap-2 md:-mt-2 max-[480px]:gap-1">
            <span className="inline-block shrink-0 text-black tracking-[-0.02em]">
              {data.headlineHighlight}
            </span>
            <span className="inline-flex shrink-0 items-center">
              <FlashfireLogo
                width={0}
                height={0}
                className="inline-block h-[2.4em] w-auto flex-shrink-0 object-contain align-middle leading-none -mx-8 max-[768px]:h-13 max-[768px]:-mx-2"
              />
            </span>
            <span className="inline-block shrink-0 text-black tracking-[-0.02em]">
              {data.headlineSuffix}
            </span>
          </div>
        </h1>

        <p className="mx-auto mb-6 max-w-[620px] px-3 text-center text-lg font-medium leading-[1.6] tracking-[-0.02em] text-black max-[768px]:mb-5 max-[768px]:text-base max-[480px]:mb-4 max-[480px]:px-2 max-[480px]:text-[0.95rem]">
          We apply to{" "}
          <span className="font-semibold text-[#ff4c00]">1200+ USA job applications</span>{" "}
          & track everything while you focus on winning the interview.
        </p>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleCta}
            {...getButtonProps()}
            className="mb-8 inline-block cursor-pointer rounded-lg border-none bg-[#ff4c00] md:px-8 md:py-4 px-5 py-4 font-inherit text-lg font-semibold text-white no-underline shadow-[0_3px_0_black] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black active:translate-y-0 max-[768px]:mb-6 max-[768px]:px-7 max-[768px]:py-3.5 max-[768px]:text-base max-[480px]:mb-5 max-[480px]:w-auto max-[480px]:px-3 max-[480px]:py-3 max-[480px]:text-[0.95rem]"          >
            {data.cta.label}
          </button>
        </div>

        <div className="mb-4 flex items-center justify-center gap-2.5 max-[768px]:gap-2 max-[480px]:flex-col max-[480px]:gap-2 md:mb-10">
          <div className="flex items-center">
            {TRUST_AVATARS.map((url, i) => (
              <div
                key={url}
                className={`relative h-[2.2rem] w-[2.2rem] overflow-hidden rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.05)] max-[768px]:h-8 max-[768px]:w-8 max-[768px]:-ml-3 max-[480px]:h-[1.8rem] max-[480px]:w-[1.8rem] max-[480px]:-ml-2.5 ${i === 0 ? "ml-0" : "-ml-3.5"}`}
              >
                <Image
                  src={url}
                  alt={`User ${i + 1}`}
                  fill
                  sizes="2.2rem"
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
          <p className="text-lg font-medium text-black max-[768px]:text-base max-[480px]:px-2 max-[480px]:text-center max-[480px]:text-sm">
            {data.trustText}
          </p>
        </div>
    </div>
  );
}
