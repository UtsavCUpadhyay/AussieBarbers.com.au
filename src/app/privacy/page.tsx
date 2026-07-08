import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How AussieBarbers collects, uses and protects your personal information.",
  alternates: { canonical: "https://aussiebarbers.com.au/privacy" },
};

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="July 2026"
      intro={`${SITE.name} respects your privacy and handles your personal information in line with the Australian Privacy Principles under the Privacy Act 1988 (Cth). This policy explains what we collect and why.`}
      sections={[
        {
          h: "What we collect",
          p: [
            "We collect information you give us when you book — your name, contact details, service address and booking preferences — and information created when you use the service, such as booking history and reviews.",
            "We collect payment details through our payment provider (Stripe). We do not store full card numbers on our own systems.",
          ],
        },
        {
          h: "How we use it",
          p: [
            "To provide and confirm your bookings, match you with a barber, process payments, send reminders and receipts, run our rewards program, and improve the service.",
            "With your consent, to send you marketing about offers and new service areas. You can opt out at any time.",
          ],
        },
        {
          h: "Who we share it with",
          p: [
            "We share only what's necessary with the barber fulfilling your booking, and with service providers who help us operate (for example payment, hosting and messaging providers). We do not sell your personal information.",
          ],
        },
        {
          h: "Security & access",
          p: [
            "We take reasonable steps to protect your information from misuse, loss and unauthorised access. You can request access to, or correction of, your personal information at any time.",
          ],
        },
        {
          h: "Contact",
          p: [`Questions or requests about your privacy can be sent to ${SITE.email}.`],
        },
      ]}
    />
  );
}
