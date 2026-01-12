'use client';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import React, { useEffect } from 'react';
import { checkAuthStatus } from './actions';
import { useRouter } from 'next/navigation';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

type Props = {};

const page = (props: Props) => {
	const router = useRouter();
	const { user, isLoading: isKindeLoading } = useKindeBrowserClient();
	const { data, isLoading: isQueryLoading } = useQuery<{ success: boolean }>({
		queryKey: ['check-user-login'],
		queryFn: async () => await checkAuthStatus(),
		retry: true,
		retryDelay: 500,
	});

	useEffect(() => {
		// Wait until both TanStack Query and Kinde are finished loading
		if (isQueryLoading || isKindeLoading) return;

		if (data?.success) {
			const stripePaymentLink = localStorage.getItem('paymentLink');
			if (stripePaymentLink && user?.email) {
				localStorage.removeItem('paymentLink');
				router.push(`${stripePaymentLink}?prefilled_email=${user.email}`);
			} else {
				// Default redirect if no payment link exists
				router.push('/');
			}
		} else if (data?.success === false) {
			// Unauthorized or sync failed
			router.push('/');
		}
	}, [data, user, router, isKindeLoading, isQueryLoading]);

	return (
		<div className="mt-20 w-full flex justify-center">
			<div className="flex flex-col items-center gap-2">
				<Loader className="w-10 h-10 animate-spin text-primary" />
				<h3 className="text-xl font-bold">Redirecting...</h3>
				<p>Please wait...</p>
			</div>
		</div>
	);
};

export default page;
