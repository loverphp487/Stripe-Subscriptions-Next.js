import prisma from '@/db/prisma';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
	const body = await req.text();
}
