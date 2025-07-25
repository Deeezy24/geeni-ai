import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import UserWelcome from "@/components/Reusable/UserWelcome";
import { generatePageMetadata } from "../metadata";

export const generateMetadata = () => {
  return generatePageMetadata({
    title: "Onboarding | CoverGenie",
    description: "Onboarding | CoverGenie",
  });
};

const OnboardingLayout = async ({ children }: { children: React.ReactNode }) => {
  const { sessionClaims } = await auth();

  if (sessionClaims?.metadata.onboardingComplete === true) {
    redirect("/m/0/dashboard");
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <UserWelcome />
        </div>
      </header>

      <section className="flex-1">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
      </section>
    </div>
  );
};

export default OnboardingLayout;
