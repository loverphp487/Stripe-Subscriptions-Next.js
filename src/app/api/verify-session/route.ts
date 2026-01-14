import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Verify a Stripe checkout session's status.
 *
 * @param {NextRequest} req - The Next.js request object.
 * @returns {NextResponse} - The Next.js response object.
 *
 * @throws {Error} - If there is an error during the request.
 * @throws {NextResponse} - If the session_id is missing, it will return a 400 error.
 * @throws {NextResponse} - If there is an error during the request, it will return a 500 error.
 */
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
