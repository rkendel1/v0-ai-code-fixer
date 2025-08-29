import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  console.warn("STRIPE_SECRET_KEY not found in environment variables")
}

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    })
  : null

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe not configured. Please add STRIPE_SECRET_KEY environment variable." },
      { status: 500 },
    )
  }

  try {
    const { bugId, userPlan } = await request.json()

    // Determine price based on user plan
    const amount = userPlan === "pro" ? 4900 : 9900 // $49 or $99 in cents

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: {
        bugId,
        type: "human_fix",
        userPlan,
      },
      description: `Human developer fix for bug ${bugId}`,
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: amount / 100, // Return amount in dollars
    })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 })
  }
}
