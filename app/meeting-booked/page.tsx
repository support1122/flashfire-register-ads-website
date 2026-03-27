import Link from "next/link";
import MeetingBookedConversionTrack from "@/src/components/MeetingBookedConversionTrack";

export default function MeetingBookedPage() {
  return (
    <>
      <MeetingBookedConversionTrack />
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#FAF3EB] p-8 text-center text-gray-800">
        <h1 className="text-2xl font-bold text-gray-900">You&apos;re booked</h1>
        <p className="max-w-md text-lg">
          Thanks for scheduling your Flashfire consultation. Check your email for
          confirmation and next steps.
        </p>
        <Link
          href="/register"
          className="font-semibold text-[#ff4c00] underline hover:text-black"
        >
          Back to registration
        </Link>
      </div>
    </>
  );
}
