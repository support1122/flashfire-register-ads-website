import Link from "next/link";

export default function BookFreeDemoPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#FAF3EB] p-8 font-sans text-gray-800">
      <p className="text-lg">Book a free demo — placeholder route.</p>
      <Link href="/" className="text-[#ff4c00] font-semibold underline">
        Back to landing
      </Link>
    </div>
  );
}
