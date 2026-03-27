"use client";

import {
  CheckCircle,
  Sparkles,
  Zap,
  Target,
  Award,
  Briefcase,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import RegisterHeroRightColumn from "@/src/components/RegisterHeroRightColumn";
import { useEffect, useState } from "react";
type OfferLetterData = {
  name: string;
  company: string;
  linkedinUrl: string;
  imagePath: string;
  profileImagePath: string;
};

const offerLetters: OfferLetterData[] = [
  {
    name: "Vaishali Jain",
    company: "Lila Sciences",
    linkedinUrl: "https://www.linkedin.com/in/vaishali-jain-187665263/",
    imagePath: "/images/vaishali_jain_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/vaishalli_jain.png",
  },
  {
    name: "Anjali",
    company: "Skyworks Solutions, Inc.",
    linkedinUrl: "https://www.linkedin.com/in/anjalishah6198/",
    imagePath: "/images/anjali_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/anjali.jpeg",
  },
  {
    name: "Akrati",
    company: "Akamai Technologies",
    linkedinUrl: "https://www.linkedin.com/in/akratimalviya/",
    imagePath: "/images/akrati_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/akrati.jpeg",
  },
  {
    name: "Neha",
    company: "Deloitte",
    linkedinUrl: "https://www.linkedin.com/in/neha-senapati/",
    imagePath: "/images/neha_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/neha.png",
  },
  {
    name: "Teja",
    company: "LVIS",
    linkedinUrl: "https://www.linkedin.com",
    imagePath: "/images/teja_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/TEJA.jpeg",
  },
  {
    name: "Rijul Jain",
    company: "Wise",
    linkedinUrl: "https://www.linkedin.com/in/-rijuljain-/",
    imagePath: "/images/rijul_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/rijul.jpg",
  },
];

export default function RegisterPage() {
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offerLetters.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Target, text: "Precision Targeting" },
    { icon: Zap, text: "Lightning Fast" },
    { icon: Award, text: "Proven Results" },
  ];

  return (
    <section className="relative mx-auto flex min-h-screen w-full max-w-[100vw] flex-col bg-[#FAF3EB] font-['Space_Grotesk'] md:grid md:min-h-screen md:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] md:items-start md:gap-x-6 lg:gap-x-10">

      {/* LEFT SECTION - Success Story */}
      <div className="relative z-10 order-2 flex min-h-0 min-w-0 items-center justify-center px-6 pb-4 pt-8 md:order-1 md:justify-end md:px-8 md:pb-2 md:pt-8 lg:px-10">
        <div className="w-full max-w-md min-w-0">
          {/* HEADER BADGE */}
          <div className="mb-6 text-center">
            <h2 className="text-[34.26px] font-black mb-4 leading-[110%] tracking-[-2.29px] text-black">
              30+ Offer Letters Received
            </h2>
          </div>

          {/* SUCCESS CARD */}
          <div className="relative w-full h-[520px] overflow-hidden">

  {offerLetters.map((item, index) => {
     const total = offerLetters.length;

     const diff = (index - currentIndex + total) % total;
    return (
      <div
        key={index}
        className="absolute w-full h-full transition-all duration-300 ease-out"
        style={{
          transform:
            diff === 0
              ? "translateX(0%)"
              : diff === 1
              ? "translateX(100%)"   // next comes from right
              : "translateX(-100%)", // all others go left
          opacity: diff === 0 ? 1 : 0,
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-2xl border-[3px] border-[#ff4c00] bg-white shadow-lg">

          {/* OFFER IMAGE */}
          <div className="relative h-full w-full">
            <Image
              src={item.imagePath}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>

          {/* FLOATING BLACK BAR */}
          <a
            href={item.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl bg-black px-4 py-3 text-white shadow-lg"
          >
            {/* Profile */}
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image src={item.profileImagePath} alt={item.name} fill />
            </div>

            {/* Text */}
            <div className="flex-1">
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-xs text-gray-300">{item.company}</p>
            </div>

            {/* LinkedIn */}
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/30">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.62-1.85 3.33-1.85 3.56 0 4.22 2.34 4.22 5.38v6.36zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
            </div>
          </a>

        </div>
      </div>
    );
  })}
</div>

          {/* Trust indicators below card */}
          {/* <div className="flex items-center justify-center gap-6 mt-5">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users className="w-4 h-4 text-[#ff4c00]" />
                    <span className="font-medium">500+ Job Seekers</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Award className="w-4 h-4 text-[#ff4c00]" />
                    <span className="font-medium">95% Success Rate</span>
               </div>
          </div> */}
        </div>
      </div>

      {/* RIGHT SECTION — main-site hero (badges, Get Started, trust avatars, universities) */}
      <div className="relative z-10 order-1 flex min-h-0 min-w-0 w-full justify-center px-5 pb-8 pt-12 md:order-2 md:min-h-0 md:items-center md:self-stretch md:px-8 md:pb-16 md:pt-10 lg:px-12">
        <div className="w-full min-w-0 max-w-full md:py-4">
          <RegisterHeroRightColumn />
        </div>
      </div>
    </section>
  );
}
