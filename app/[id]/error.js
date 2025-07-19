'use client';

import { useEffect } from 'react';
import Link from 'next/link';


export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
      <div className="text-6xl mb-4 animate-pulse">🚨</div>

      <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
        Something went wrong
      </h1>

      <p className="text-gray-700 text-base md:text-lg mb-6">
        An unexpected error occurred while processing your request.
      </p>

      {process.env.NODE_ENV === 'development' && error?.message && (
        <pre className="bg-gray-100 text-sm text-left text-red-600 p-4 rounded w-full max-w-lg overflow-auto mb-6">
          {error.message}
        </pre>
      )}

      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => reset()}
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Try Again
        </button>

        <Link
          href="/"
          className="px-5 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
