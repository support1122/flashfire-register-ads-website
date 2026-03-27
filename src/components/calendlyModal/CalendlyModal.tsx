"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Calendar, CheckCircle } from "lucide-react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { warmCalendly } from "@/src/utils/calendlyWarmup";
import { apiUrl } from "@/src/utils/apiBase";

interface CalendlyModalProps {
  isVisible: boolean;
  onClose: () => void;
  user: {
    fullName?: string;
    email?: string;
    phone?: string;
    countryCode?: string;
  };
}

interface CalendlyEventPayload {
  invitee?: {
    email?: string;
    name?: string;
    uri?: string;
  };
  event?: {
    uri?: string;
    start_time?: string;
    start_time_pretty?: string;
    end_time?: string;
    location?: {
      join_url?: string;
    };
  };
  name?: string;
  email?: string;
}

interface CalendlyEvent {
  data?: {
    payload?: CalendlyEventPayload;
  };
  payload?: CalendlyEventPayload;
}

interface CalendlyEventListenerOptions {
  onProfilePageSubmitted?: (e: CalendlyEvent) => void;
  onEventScheduled?: (e: CalendlyEvent) => Promise<void> | void;
}

/** SSR + first client paint must match — no localStorage. Updated after mount. */
const DEFAULT_CALENDLY_URL =
  "https://calendly.com/feedback-flashfire/30min?utm_source=webpage_visit&utm_medium=website";

function buildCalendlyUrlFromStorage(): string {
  if (typeof window === "undefined") return DEFAULT_CALENDLY_URL;
  const utm_source = localStorage.getItem("utm_source") || "webpage_visit";
  const utm_medium = localStorage.getItem("utm_medium") || "website";
  const utm_campaign = localStorage.getItem("utm_campaign");
  const utm_content = localStorage.getItem("utm_content");
  const utm_term = localStorage.getItem("utm_term");
  let url = `https://calendly.com/feedback-flashfire/30min?utm_source=${encodeURIComponent(utm_source)}&utm_medium=${encodeURIComponent(utm_medium)}`;
  if (utm_campaign) url += `&utm_campaign=${encodeURIComponent(utm_campaign)}`;
  if (utm_content) url += `&utm_content=${encodeURIComponent(utm_content)}`;
  if (utm_term) url += `&utm_term=${encodeURIComponent(utm_term)}`;
  return url;
}

export default function CalendlyModal({
  isVisible,
  onClose,
  user,
}: CalendlyModalProps) {
  const router = useRouter();
  const [profileInvitee, setProfileInvitee] = useState<{
    email?: string;
    name?: string;
  } | null>(null);
  const [isCalendlyReady, setIsCalendlyReady] = useState(false);
  const [calendlyUrl, setCalendlyUrl] = useState(DEFAULT_CALENDLY_URL);

  useEffect(() => {
    setCalendlyUrl(buildCalendlyUrlFromStorage());
  }, []);

  useEffect(() => {
    if (isVisible) {
      setCalendlyUrl(buildCalendlyUrlFromStorage());
    }
  }, [isVisible]);

  useEffect(() => {
    warmCalendly();
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const checkReady = () => {
      const iframe = document.querySelector<HTMLIFrameElement>(
        'iframe[src*="calendly.com"]'
      );
      if (!iframe) return false;
      setIsCalendlyReady(true);
      return true;
    };

    if (checkReady()) return;

    const observer = new MutationObserver(() => {
      if (checkReady()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const savedName = localStorage.getItem("cal_invitee_name") || undefined;
      const savedEmail = localStorage.getItem("cal_invitee_email") || undefined;
      if (savedName || savedEmail) {
        setProfileInvitee({ name: savedName, email: savedEmail });
      }
    } catch {
      /* ignore */
    }
  }, []);

  useCalendlyEventListener({
    onProfilePageSubmitted: (e: CalendlyEvent) => {
      try {
        const payload = e?.data?.payload || e?.payload || {};
        const name = payload?.name || payload?.invitee?.name || "";
        const email = payload?.email || payload?.invitee?.email || "";
        if (name || email) {
          setProfileInvitee({ name, email });
          try {
            if (typeof window !== "undefined") {
              if (name) localStorage.setItem("cal_invitee_name", name);
              if (email) localStorage.setItem("cal_invitee_email", email);
            }
          } catch {
            /* ignore */
          }
        }
      } catch (err) {
        console.error("Failed to capture Calendly profile submission", err);
      }
    },
    onEventScheduled: async (e: CalendlyEvent) => {
      try {
        const payload = e?.data?.payload || e?.payload || {};
        const inviteeEmail =
          payload?.invitee?.email ||
          user?.email ||
          profileInvitee?.email ||
          (typeof window !== "undefined" ? localStorage.getItem("cal_invitee_email") : null) ||
          "";
        const inviteeName =
          payload?.invitee?.name ||
          user?.fullName ||
          profileInvitee?.name ||
          (typeof window !== "undefined" ? localStorage.getItem("cal_invitee_name") : null) ||
          "";
        const eventStartTime =
          payload?.event?.start_time ||
          payload?.event?.start_time_pretty ||
          "";

        try {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("flashfire_meeting_booked_pending_track", "1");
          }
        } catch {
          /* ignore */
        }

        router.push("/meeting-booked");

        const meetingUrl =
          payload?.event?.uri ||
          payload?.event?.location?.join_url ||
          "";

        const utm_source =
          typeof window !== "undefined"
            ? localStorage.getItem("utm_source") || "direct"
            : "direct";
        const utm_medium =
          typeof window !== "undefined"
            ? localStorage.getItem("utm_medium") || "website"
            : "website";
        const utm_campaign =
          typeof window !== "undefined"
            ? localStorage.getItem("utm_campaign") || "organic"
            : "organic";
        const utm_content =
          typeof window !== "undefined"
            ? localStorage.getItem("utm_content")
            : null;
        const utm_term =
          typeof window !== "undefined" ? localStorage.getItem("utm_term") : null;

        try {
          const bookingData = {
            utmSource: utm_source,
            utmMedium: utm_medium,
            utmCampaign: utm_campaign,
            utmContent: utm_content,
            utmTerm: utm_term,
            clientName: inviteeName,
            clientEmail: inviteeEmail,
            clientPhone: user?.phone
              ? `${user?.countryCode || ""}${user?.phone}`
              : null,
            calendlyEventUri: payload?.event?.uri || null,
            calendlyInviteeUri: payload?.invitee?.uri || null,
            calendlyMeetLink: meetingUrl,
            scheduledEventStartTime: eventStartTime,
            scheduledEventEndTime: payload?.event?.end_time || null,
            visitorId:
              typeof window !== "undefined"
                ? localStorage.getItem("visitor_id")
                : null,
            userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
            source: "frontend_direct",
            leadSource: "register_landing",
          };

          const response = await fetch(
            apiUrl("/api/campaign-bookings/frontend-capture"),
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bookingData),
            }
          );

          if (!response.ok) {
            console.warn(
              "Backend booking save failed:",
              await response.text()
            );
          }
        } catch (backendError) {
          console.warn("Failed to send booking to backend:", backendError);
        }
      } catch (err) {
        console.error("Calendly scheduled event capture failed", err);
      }
    },
  } as CalendlyEventListenerOptions);

  return (
    <div
      className="fixed inset-0 z-[9999] w-full items-center justify-center bg-black/60"
      style={{ display: isVisible ? "flex" : "none" }}
      aria-hidden={!isVisible}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white/80 shadow-2xl backdrop-blur-sm lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-white/90 p-2 text-gray-400 shadow-lg transition-colors hover:text-gray-600 sm:right-6 sm:top-6"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <div className="block h-full w-full lg:hidden">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-white/20 p-2">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">
                  Schedule Your Flashfire Consultation
                </h2>
                <p className="text-sm text-orange-100">15 Minutes • Free</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[90vh] w-full">
          <div className="hidden w-2/5 overflow-y-hidden rounded-l-xl bg-gradient-to-br from-orange-500 to-red-600 p-8 text-white lg:block">
            <div className="mb-6">
              <div className="mb-4 flex items-center space-x-3">
                <div className="rounded-xl bg-white/20 p-3">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Schedule Your Flashfire Consultation
                  </h2>
                  <p className="text-orange-100">15 Minutes • Free</p>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-orange-100">
                Book your personalized consultation to learn how Flashfire can
                automate your job search and land interviews faster.
              </p>
            </div>

            <div className="mb-6 space-y-4">
              <h3 className="mb-4 text-xl font-bold">What You&apos;ll Get:</h3>

              <div className="flex items-start space-x-3">
                <CheckCircle className="mt-0.5 h-5 w-5 text-green-300" />
                <div>
                  <h4 className="font-semibold">Personalized Strategy</h4>
                  <p className="text-sm text-orange-100">
                    Custom job search plan tailored to your goals
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="mt-0.5 h-5 w-5 text-green-300" />
                <div>
                  <h4 className="font-semibold">Resume Review</h4>
                  <p className="text-sm text-orange-100">
                    Expert feedback on your current resume
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="mt-0.5 h-5 w-5 text-green-300" />
                <div>
                  <h4 className="font-semibold">AI Demo</h4>
                  <p className="text-sm text-orange-100">
                    See our automation technology in action
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="mt-0.5 h-5 w-5 text-green-300" />
                <div>
                  <h4 className="font-semibold">Q&A Session</h4>
                  <p className="text-sm text-orange-100">
                    Get all your questions answered by experts
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/20 pt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-xs text-orange-100">Success Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">100+</div>
                  <div className="text-xs text-orange-100">Jobs Landed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">220+</div>
                  <div className="text-xs text-orange-100">Hours Saved</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full overflow-hidden bg-white lg:w-3/5 lg:rounded-r-xl">
            {!isCalendlyReady && isVisible && (
              <div className="absolute inset-0 z-10 bg-white" />
            )}
            <InlineWidget
              url={calendlyUrl}
              prefill={{
                name: user?.fullName || "",
                email: user?.email || "",
                customAnswers: {
                  a3: (user?.countryCode || "") + (user?.phone || ""),
                },
              }}
              styles={{
                height: "100%",
                width: "100%",
                minHeight: "calc(100vh - 100px)",
              }}
              pageSettings={{
                backgroundColor: "ffffff",
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: "f97316",
                textColor: "374151",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
