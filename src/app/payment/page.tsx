'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
	const searchParams = useSearchParams();
	const sessionId = searchParams.get('session_id');
	const [loading, setLoading] = useState(true);
	const [result, setResult] = useState<string | null>(null);

	useEffect(() => {
		if (!sessionId) return;

		const checkStatus = async () => {
			try {
				const res = await fetch(`/api/verify-session?session_id=${sessionId}`);
				const data = await res.json();

				if (data.status === 'complete' && data.payment_status === 'paid') {
					setResult(
						`Success! Thank you for your purchase, ${data.customer_email}.`,
					);
				} else {
					setResult('Payment was not completed.');
				}
			} catch (err) {
				setResult('Error verifying payment.');
			} finally {
				setLoading(false);
			}
		};

		checkStatus();
	}, [sessionId]);

	return <div>{result}</div>;
}
