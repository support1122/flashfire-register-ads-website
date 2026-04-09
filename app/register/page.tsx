import type { Metadata } from "next";
import RegisterLandingPage from "@/src/components/RegisterLandingPage";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Register for Flashfire AI — automate your job search and land interview calls faster.",
};

export default function RegisterPage() {
  return <RegisterLandingPage />;
}
