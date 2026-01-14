import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const sessionId = searchParams.get('session_id');

	if (!sessionId) {
		return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
	}

	try {
		// Retrieve the session from Stripe to verify payment status
		const session = await stripe.checkout.sessions.retrieve(sessionId);

		return NextResponse.json({
			status: session.status, // e.g., 'complete'
			payment_status: session.payment_status, // e.g., 'paid'
			customer_email: session.customer_details?.email,
		});
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}
