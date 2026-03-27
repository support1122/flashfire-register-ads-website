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
    name: "Kanchan",
    company: "MiRus",
    linkedinUrl: "https://www.linkedin.com/in/dr-kanchan-yadav-ba0b18106/",
    imagePath: "/images/kanchan_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/kanchan.jpeg",
  },
  {
    name: "Uhtiha",
    company: "MaineHealth Maine Medical Center",
    linkedinUrl: "https://www.linkedin.com/in/uhitha-doddapaneni-903932128/",
    imagePath: "/images/uhitha_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/uhitha.jpeg",
  },
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
    name: "Aryan",
    company: "IBM",
    linkedinUrl: "#",
    imagePath: "/images/aryan_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aryan.jpg",
  },
  {
    name: "Amit",
    company: "Armorcode",
    linkedinUrl: "#",
    imagePath: "/images/amit_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/amit%20(1).jpg",
  },
  {
    name: "Rudraksh",
    company: "State Street",
    linkedinUrl: "#",
    imagePath: "/images/rudraksh_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/rudraksh.jpg",
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
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#ff4c00]/20 bg-gradient-to-r from-[#ff4c00]/15 to-[#ff6b33]/10 px-4 py-2.5 text-sm font-bold tracking-wide text-[#ff4c00]">
              <Sparkles className="h-4 w-4" />
              30+ Offer Letters Received
            </div>
          </div>

          {/* SUCCESS CARD */}
          <div className="relative w-full h-[520px]">

            {offerLetters.map((item, index) => {
              const position =
                (index - currentIndex + offerLetters.length) % offerLetters.length;

              return (
                <div
                  key={index}
                  className="absolute w-full transition-all duration-700 ease-in-out"
                  style={{
                    transform: `
            translateY(${position * 12}px)
            scale(${1 - position * 0.05})
          `,
                    zIndex: offerLetters.length - position,
                    opacity: position > 2 ? 0 : 1,
                  }}
                >
                  <div className="overflow-hidden rounded-3xl border border-[#ffd7c4] bg-white p-6 shadow-[0_8px_32px_rgba(255,76,0,0.08)]">

                    {/* USER */}
                    <div className="mb-4 flex items-center gap-3">
                      <a
                        href={item.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-4 flex items-center gap-3"
                      >
                        {/* Profile */}
                        <div className="relative h-12 w-12 overflow-hidden rounded-full">
                          <Image src={item.profileImagePath} alt={item.name} fill />
                        </div>

                        {/* Name + Company */}
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.company}</p>
                        </div>

                        {/* ALWAYS VISIBLE LINKEDIN */}
                        <div className="flex items-center gap-1 text-[#ff4c00] text-sm font-medium">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.62-1.85 3.33-1.85 3.56 0 4.22 2.34 4.22 5.38v6.36zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                          </svg>
                         
                        </div>
                      </a>
                    </div>

                    {/* OFFER IMAGE */}
                    <div className="relative h-[360px] w-full overflow-hidden rounded-xl bg-[#fafafa]">
                      <Image
                        src={item.imagePath}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>

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
