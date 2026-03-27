"use client";

import React, { useEffect } from "react";
import { X, MapPin } from "lucide-react";

interface GeoBlockModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const GeoBlockModal: React.FC<GeoBlockModalProps> = ({
  isVisible,
  onClose,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isVisible) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
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
            <div className="rounded-full bg-orange-100 p-3">
              <MapPin className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <h3 className="mb-3 text-lg font-semibold text-gray-900">
            Our services are currently limited to the USA.
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-gray-600">
            We are working hard to expand access worldwide. Stay tuned for updates
            on our global availability!
          </p>

          <div className="mb-6 rounded-lg border border-orange-200 bg-orange-50 p-3">
            <p className="text-sm font-medium text-orange-800">Coming soon to India!</p>
          </div>

          <p className="mt-6 border-t border-gray-100 pt-4 text-xs text-gray-500">
            For questions about our expansion, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeoBlockModal;
