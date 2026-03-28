import type { Metadata } from "next";
import MeetingBookedConversionTrack from "@/src/components/MeetingBookedConversionTrack";
import MeetingBookedModal from "@/src/components/MeetingBookedModal";

export const metadata: Metadata = {
  title: "Meeting Booked",
  description: "Your Flashfire consultation has been scheduled successfully.",
};

export default function MeetingBookedPage() {
  return (
    <>
      <MeetingBookedConversionTrack />
      <div className="min-h-screen bg-[#FAF3EB]">
        <MeetingBookedModal />
      </div>
    </>
  );
}
