'use server';

import prisma from '@/db/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

/**
 * Checks if the user has a premium subscription.
 * @returns { success: boolean, subscription: boolean }
 */
export async function checkIsSubscription() {
	const { getUser } = getKindeServerSession();

	const user = await getUser();

	if (!user) return { success: false };

	const existingUser = await prisma.user.findUnique({
		where: {
			id: user.id,
		},
	});

	if (!existingUser) return { success: false };

	return { success: true, subscription: existingUser.plan === 'premium' };
}
