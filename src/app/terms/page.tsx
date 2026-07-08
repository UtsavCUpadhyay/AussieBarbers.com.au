import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply when you book and use AussieBarbers.",
  alternates: { canonical: "https://aussiebarbers.com.au/terms" },
};

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="July 2026"
      intro={`These terms govern your use of ${SITE.name} and any booking you make. By booking, you agree to them. Nothing here limits rights you have under the Australian Consumer Law.`}
      sections={[
        {
          h: "Bookings & payment",
          p: [
            "A booking is confirmed once you receive confirmation from us. Prices are shown before you pay and are inclusive within our core service zones; travel surcharges for outer areas are shown upfront.",
            "Payment is taken securely via card at the time of booking or after the service, as indicated at checkout.",
          ],
        },
        {
          h: "Cancellations & changes",
          p: [
            "You can reschedule or cancel free of charge up to 12 hours before your appointment. Cancellations inside 12 hours, or no-shows, may incur a fee to cover the barber's reserved time and travel.",
          ],
        },
        {
          h: "At your appointment",
          p: [
            "Please provide safe, reasonable access, a power point, and enough space for the service. Allocated or off-street parking at the address is strongly preferred so appointments run on time.",
            "We may decline or end a service where a barber's safety or wellbeing is at risk.",
          ],
        },
        {
          h: "Rewards program",
          p: [
            "Members earn 5 points per completed, paid haircut. At 20 points, a free standard haircut reward is issued. Points and rewards are personal and non-transferable — they can only be earned and redeemed by the member on their own visits, and have no cash value.",
            "We may adjust or end the rewards program with reasonable notice.",
          ],
        },
        {
          h: "Satisfaction",
          p: [
            "If you're not happy with your cut, tell us within 48 hours and we'll make it right — a touch-up or, at our discretion, a refund, consistent with your consumer guarantees.",
          ],
        },
        {
          h: "Contact",
          p: [`For any questions about these terms, contact ${SITE.email}.`],
        },
      ]}
    />
  );
}
