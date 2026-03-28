"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PlayCircle, Users, X } from "lucide-react";

type Props = {
  onClose?: () => void;
};

export default function MeetingBookedModal({ onClose }: Props) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      {/* Main Popup Overlay */}
      <div className="fixed inset-0 z-[9985] flex items-center justify-center bg-black/60 px-3 py-4 md:px-4 md:py-6">
        <div className="relative w-full max-w-[360px] rounded-2xl border border-orange-100 bg-white px-4 py-5 text-center shadow-2xl md:max-w-[420px] md:px-6 md:py-6">
          {/* Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          )}

          <h1 className="mb-2 text-lg font-extrabold text-slate-900 md:text-2xl">
            <span className="text-[#ff4c00]">Thank you</span>{" "}
            <span>for scheduling a call!</span>
          </h1>

          <p className="mb-3 text-[11px] text-slate-700 md:mb-3.5 md:text-sm">
            You&apos;re one step closer to your next career move with Flashfire.
          </p>

          <div className="mb-4 md:mb-5">
            <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <Image
                src="/images/meme.jpg"
                alt="See you there"
                width={512}
                height={256}
                className="h-36 w-full object-cover md:h-44"
              />
            </div>
          </div>

          <p className="mb-4 text-center text-[11px] text-slate-700 md:mb-5 md:text-sm">
            To make our conversation more productive, we recommend watching our
            short Flashfire demo video before the call.
          </p>

          <div className="mb-2 flex justify-center md:mb-3">
            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="inline-flex items-center justify-center rounded-lg bg-[#ff4c00] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#e24400] md:text-sm"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Watch Demo Video (2 min)
            </button>
          </div>

          <div className="flex flex-col items-center gap-2 border-t border-slate-100 pt-1 md:pt-2">
            <div className="flex -space-x-1.5">
              {[
                "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/amit%20(1).jpg",
                "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aman.jpg",
                "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/akrati.jpeg",
              ].map((src, i) => (
                <div
                  key={src}
                  className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-white bg-[#fff7f2]"
                  aria-hidden="true"
                >
                  <Image
                    src={src}
                    alt={`User ${i + 1}`}
                    fill
                    sizes="32px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>

            <p className="flex items-center gap-1 text-center text-[11px] text-slate-600 md:text-sm">
              <Users className="h-4 w-4" />
              Trusted by 560+ Users
            </p>

            <Link
              href="/register"
              className="mt-1 inline-flex items-center justify-center text-xs font-semibold text-[#ff4c00] hover:underline md:text-sm"
            >
              Back to Registration
            </Link>
          </div>
        </div>
      </div>

      {/* Demo Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/60 px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-label="Demo video"
          onMouseDown={() => setIsVideoOpen(false)}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 md:px-5">
              <p className="text-sm font-semibold text-slate-900 md:text-base">
                Flashfire Demo Video
              </p>
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-slate-100"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-slate-700" />
              </button>
            </div>

            <div className="bg-white p-4 md:p-5">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <video
                  className="absolute inset-0 h-full w-full rounded-lg"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/videos/ii.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
