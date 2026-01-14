'use client';

import { Loader } from 'lucide-react';

/**
 * A full-screen loading spinner.
 *
 * This component renders a full-screen loading indicator. It is
 * intended to be used as a placeholder while the main content of
 * the page is loading.
 *
 * @returns A `div` element with a loading spinner.
 */
export default function Loading() {
	return (
		<div className="w-full h-full  flex-1 flex flex-col justify-center items-center">
			<Loader className="w-10 h-10 animate-spin text-primary" />
		</div>
	);
}
