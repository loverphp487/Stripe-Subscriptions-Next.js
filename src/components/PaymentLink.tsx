'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { buttonVariants } from './ui/button';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

type Props = {
	href: string;
	paymentLink?: string;
	buttonText: string;
};

const PaymentLink = ({ href, buttonText, paymentLink }: Props) => {
	const { user, isLoading } = useKindeBrowserClient();
	const [mounted, setMounted] = useState(false);

	// Ensure component is mounted to avoid hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	const handleLinkClick = (e: React.MouseEvent) => {
		if (paymentLink) {
			localStorage.setItem('paymentLink', paymentLink);
		}
		// If not logged in and no fallback, prevent navigation
		if (!user?.email && !href) {
			e.preventDefault();
		}
	};

	// Return a placeholder or loading state during SSR/Loading
	if (!mounted || isLoading) {
		return (
			<span className={buttonVariants({ variant: 'ghost' })}>{buttonText}</span>
		);
	}

	const finalHref =
		user?.email && paymentLink
			? paymentLink
			: user?.email && !paymentLink
			? '#'
			: href;

	return (
		<Link
			href={finalHref}
			onClick={handleLinkClick}
			className={buttonVariants()}
		>
			{buttonText}
		</Link>
	);
};

export default PaymentLink;
