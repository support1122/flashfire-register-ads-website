"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import FlashfireLogo from "@/src/components/FlashfireLogo";
import { registerHeroData, UNIVERSITY_LOGOS } from "@/src/data/registerHero";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";

const TRUST_AVATARS = [
  "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/amit%20(1).jpg",
  "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aman.jpg",
  "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/akrati.jpeg",
];

export default function RegisterHeroRightColumn() {
  const router = useRouter();
  const data = registerHeroData;

  const handleCta = () => {
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

    router.push("/register/book-a-free-demo", { scroll: false });
    window.dispatchEvent(new CustomEvent("showCalendlyModal"));
  };

  return (
    <div className="relative mx-auto w-full min-w-0 max-w-[min(100%,40rem)] px-1 md:px-2">
        <div className="mb-7 mt-2 flex flex-wrap justify-center gap-2.5 max-[480px]:mb-4 max-[480px]:mt-1 max-[480px]:gap-2">
          {data.badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex min-h-[30px] items-center justify-center whitespace-nowrap rounded-none border-[0.5px] border-black px-3.5 py-1.5 text-center text-sm font-bold uppercase leading-tight tracking-[0.72px] text-[#F55D1D] opacity-100 max-[768px]:min-h-[26px] max-[768px]:px-2.5 max-[768px]:py-1 max-[768px]:text-xs max-[480px]:min-h-[24px] max-[480px]:px-2 max-[480px]:py-0.5 max-[480px]:text-[0.65rem]"
            >
              {badge}
            </span>
          ))}
        </div>

        <h1
          className="mx-auto mb-5 w-full max-w-[900px] px-2 text-center font-bold leading-[1.12] tracking-[-0.02em] text-black max-[480px]:mb-4 max-[480px]:px-1"
          style={{
            /* Tighter at small widths so one-line headline fits without horizontal scroll */
            fontSize: "clamp(0.95rem, 2.2vw + 0.55rem, 3.5rem)",
          }}
        >
          {/* Line 1: static — no overflow-x-auto (that was making the line swipe/scroll) */}
          <span className="block w-full text-center whitespace-nowrap px-0.5">
            {data.headlineMain}
          </span>
          {/* Line 2: static centered row */}
          <div className="mt-1 flex w-full flex-nowrap items-center justify-center gap-2 max-[480px]:gap-1">
            <span className="shrink-0 whitespace-nowrap">{data.headlineHighlight}</span>
            <FlashfireLogo
              width={118}
              height={118}
              className="-mx-8 inline-block h-[2.4em] w-auto flex-shrink-0 object-contain align-middle leading-none max-[768px]:mx-0 max-[768px]:h-11 max-[768px]:w-auto"
            />
            <span className="shrink-0 whitespace-nowrap">{data.headlineSuffix}</span>
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
            className="mb-8 inline-block cursor-pointer rounded-lg border-none bg-[#ff4c00] px-8 py-4 font-inherit text-lg font-semibold text-white no-underline shadow-[0_3px_0_black] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black active:translate-y-0 max-[768px]:mb-6 max-[768px]:px-7 max-[768px]:py-3.5 max-[768px]:text-base max-[480px]:mb-5 max-[480px]:w-full max-[480px]:max-w-[300px] max-[480px]:px-5 max-[480px]:py-3 max-[480px]:text-[0.95rem]"
          >
            {data.cta.label}
          </button>
        </div>

        <div className="mb-10 flex items-center justify-center gap-2.5 max-[768px]:mb-8 max-[768px]:gap-2 max-[480px]:mb-6 max-[480px]:flex-col max-[480px]:gap-2">
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

        <div className="mx-auto mb-2 flex w-full max-w-full flex-col items-center justify-center gap-[0.05rem] max-[768px]:mb-4 max-[768px]:p-1 max-[480px]:mb-2">
          <div className="mx-auto mb-0 w-[90%] max-w-[90%] rounded-none bg-white px-3 py-2 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08)] max-[768px]:w-[95%] max-[768px]:py-1.5 max-[768px]:px-2.5 max-[480px]:w-full max-[480px]:px-1.5 max-[480px]:py-1.5">
            <p className="m-0 text-[0.75rem] font-normal uppercase tracking-[0.05em] text-[#555] max-[768px]:text-[0.7rem] max-[480px]:text-[0.65rem]">
              {data.universityHeading}
            </p>
          </div>

          <div className="relative mx-auto mt-0 w-[90%] max-w-[90%] overflow-hidden rounded-none p-0 max-[768px]:max-w-[95%] max-[480px]:w-full max-[480px]:max-w-full">
            <div
              className="flex w-max min-w-0 flex-nowrap items-center gap-[0.05rem]"
              style={{ animation: "slide-left 20s linear infinite" }}
            >
              {[...data.universities, ...data.universities].map((uni, index) => {
                const logoSrc =
                  UNIVERSITY_LOGOS[uni.name] ||
                  `https://logo.clearbit.com/${uni.domain}`;

                return (
                  <div
                    key={`${uni.name}-${index}`}
                    className="flex h-14 w-[170px] flex-none flex-row items-center justify-start gap-2 rounded-md border border-gray-200 bg-white p-2 shadow-[0_1px_3px_rgba(0,0,0,0.08)] max-[768px]:h-12 max-[768px]:w-[155px] max-[768px]:gap-1.5 max-[768px]:p-1.5 max-[480px]:h-11 max-[480px]:w-[140px] max-[480px]:gap-1.5 max-[480px]:p-1"
                  >
                    <Image
                      src={logoSrc}
                      alt={uni.name}
                      width={48}
                      height={32}
                      className="h-6 max-h-6 w-auto max-w-[40px] flex-shrink-0 object-contain max-[768px]:h-5 max-[768px]:max-w-[36px] max-[480px]:h-4 max-[480px]:max-w-[32px]"
                      unoptimized
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const attempts = parseInt(
                          target.getAttribute("data-attempts") || "0",
                          10,
                        );
                        if (attempts === 0 && target.src.includes("clearbit.com")) {
                          target.setAttribute("data-attempts", "1");
                          target.src = `https://www.google.com/s2/favicons?domain=${uni.domain}&sz=128`;
                          return;
                        }
                        if (attempts >= 1) {
                          target.style.opacity = "0.3";
                          target.style.pointerEvents = "none";
                        }
                      }}
                    />
                    <p className="m-0 line-clamp-2 flex-1 p-0 text-left text-[0.7rem] font-medium leading-[1.2] text-black max-[768px]:text-[0.65rem] max-[480px]:text-[0.6rem] max-[480px]:leading-[1.15]">
                      {uni.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
    </div>
  );
}
