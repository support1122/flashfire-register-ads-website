"use client";

import React, { useEffect } from "react";
import { X, CheckCircle } from "lucide-react";

interface GeoBypassSuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const GeoBypassSuccessModal: React.FC<GeoBypassSuccessModalProps> = ({
  isVisible,
  onClose,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isVisible) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => {
        clearTimeout(timer);
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[101] flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="relative mx-4 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-1 text-gray-400 transition hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <h3 className="mb-3 text-lg font-semibold text-gray-900">
            Geo-block bypassed
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-gray-600">
            You can now continue with booking your demo.
          </p>

          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-3">
            <p className="text-sm font-medium text-green-800">
              Continue with your booking below.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoBypassSuccessModal;
