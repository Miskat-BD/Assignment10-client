import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/app/lib/stripe';
import { auth } from '@/app/lib/auth';

export async function POST() {
    try {
        const userSession = await auth.api.getSession({
            headers: await headers()
        })
        const user = userSession?.user
        const headersList = await headers()
        const origin = headersList.get('origin')
        const PRICE_ID = "price_1TmXCmAYc005i1GweCzEoXNi"

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: PRICE_ID,
                    quantity: 1,
                },
            ],
            metadata: {
                priceId: PRICE_ID,
                userId: user?.id,
                userEmail: user?.email,
                userName: user?.name
            },
            mode: 'subscription',
            success_url: `${origin}/plans/success?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}