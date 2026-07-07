import { NextResponse } from "next/server";
import Stripe from "stripe";

// Creates a Stripe Checkout session for a booking deposit or membership.
// Returns 503 until STRIPE_SECRET_KEY is configured, so the app runs pre-Stripe.

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Payments not configured yet." },
      { status: 503 }
    );
  }

  const stripe = new Stripe(secret);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aussiebarbers.com.au";

  let body: { serviceName?: string; amountAud?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const amount = Math.round((body.amountAud ?? 0) * 100);
  if (!body.serviceName || amount <= 0) {
    return NextResponse.json({ error: "Missing service or amount." }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "aud",
            product_data: { name: `AussieBarbers — ${body.serviceName}` },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/book?paid=1`,
      cancel_url: `${siteUrl}/book?cancelled=1`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
