"use client";

import Image from "next/image";
import { registerHeroData, UNIVERSITY_LOGOS } from "@/src/data/registerHero";

type Props = {
  className?: string;
};

export default function TrustedUniversitiesSection({ className = "" }: Props) {
  const data = registerHeroData;

  return (
    <div
      className={`mx-auto mb-2 flex w-full max-w-full flex-col items-center justify-center gap-[0.05rem] max-[768px]:mb-4 max-[768px]:p-1 max-[480px]:mb-2 ${className}`}
    >
      <div className="mx-auto mb-0 w-[90%] max-w-[90%] rounded-none bg-white px-3 py-2 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08)] max-[768px]:w-[95%] max-[768px]:px-2.5 max-[768px]:py-1.5 max-[480px]:w-full max-[480px]:px-1.5 max-[480px]:py-1.5">
        <p className="m-0 text-[0.75rem] font-normal uppercase tracking-[0.05em] text-[#555] max-[768px]:text-[0.7rem] max-[480px]:text-[0.65rem]">
          {data.universityHeading}
        </p>
      </div>

      <div className="relative mx-auto mt-0 w-[90%] max-w-[90%] overflow-hidden rounded-none p-0 max-[768px]:max-w-[95%] max-[480px]:w-full max-[480px]:max-w-full">
        <div className="flex w-max min-w-0 flex-nowrap items-center gap-[0.05rem]">
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
  );
}
