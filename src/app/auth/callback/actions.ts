'use server';
import prisma from '@/db/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

/**
 * Checks if the user is already present in the database.
 * If the user is not present, creates a new user in the database.
 * @returns { success: boolean }
 */
export async function checkAuthStatus() {
	const { getUser } = getKindeServerSession();

	const user = await getUser();

	if (!user) return { success: false };

	const existingUser = await prisma.user.findUnique({
		where: {
			id: user.id,
		},
	});

	if (!existingUser) {
		console.log('no existing user');
		await prisma.user.create({
			data: {
				id: user.id,
				email: user.email!,
				name: `${user.given_name} ${user.family_name}`,
				image: user.picture,
			},
		});
	}

	return { success: true };
}
