"use client";

import { useEffect } from "react";
import * as fbq from "@/lib/metaPixel";
import * as linkedin from "@/lib/linkedinInsightTag";
import * as googleAds from "@/lib/googleAds";
import { LINKEDIN_CONVERSION_IDS } from "@/lib/linkedinConversions";

const MEETING_BOOKED_PENDING_KEY = "flashfire_meeting_booked_pending_track";

/**
 * Same conversion stack as main site MeetingBookedModal (Meta Schedule, LinkedIn, Google Ads + GA4).
 */
export default function MeetingBookedConversionTrack() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(MEETING_BOOKED_PENDING_KEY) !== "1") {
      return;
    }
    sessionStorage.removeItem(MEETING_BOOKED_PENDING_KEY);

    try {
      const inviteeEmail = localStorage.getItem("cal_invitee_email") || "";
      const inviteeName = localStorage.getItem("cal_invitee_name") || "";

      const utm_source = localStorage.getItem("utm_source") || "direct";
      const utm_medium = localStorage.getItem("utm_medium") || "website";
      const utm_campaign = localStorage.getItem("utm_campaign") || "organic";

      fbq.event("Schedule", {
        content_name: "Meeting Booked",
        content_category: "Consultation",
        value: 0,
        currency: "USD",
        ...(inviteeEmail && { em: inviteeEmail.toLowerCase() }),
        ...(inviteeName && { fn: inviteeName.split(" ")[0] }),
        ...(inviteeName && {
          ln: inviteeName.split(" ").slice(1).join(" "),
        }),
        utm_source,
        utm_medium,
        utm_campaign,
      });

      if (LINKEDIN_CONVERSION_IDS.SCHEDULE) {
        try {
          linkedin.trackSchedule(LINKEDIN_CONVERSION_IDS.SCHEDULE, {
            value: 0,
            currency: "USD",
            ...(inviteeEmail && { email: inviteeEmail.toLowerCase() }),
            ...(inviteeName && { firstName: inviteeName.split(" ")[0] }),
            ...(inviteeName && {
              lastName: inviteeName.split(" ").slice(1).join(" "),
            }),
            utm_source,
            utm_medium,
            utm_campaign,
          });
        } catch (linkedinError) {
          console.error("Failed to track LinkedIn event:", linkedinError);
        }
      }

      try {
        googleAds.trackMeetingBooked({
          value: 1.0,
          currency: "INR",
          ...(inviteeEmail && { email: inviteeEmail.toLowerCase() }),
          ...(inviteeName && { firstName: inviteeName.split(" ")[0] }),
          ...(inviteeName && {
            lastName: inviteeName.split(" ").slice(1).join(" "),
          }),
        });
      } catch (googleAdsError) {
        console.error("Failed to track Google event:", googleAdsError);
      }
    } catch (error) {
      console.error("Failed to track conversion events:", error);
    }
  }, []);

  return null;
}
