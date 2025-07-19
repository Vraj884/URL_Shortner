'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
            <div className="animate-bounce text-6xl mb-4">🔍</div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-red-600 mb-2">
                Short URL Not Found
            </h1>
            <p className="text-gray-700 text-lg mb-6">
                The link you are trying to access does not exist or has expired.
            </p>

            <Link
                href="/"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
                Go to Homepage
            </Link>
        </div>
    );
}
