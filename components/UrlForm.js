"use client";

import { useState } from "react";
import { Quicksand } from 'next/font/google';
import { Loader2 } from 'lucide-react';

const QuicksandFont = Quicksand({
    weight: "700",
    subsets: ["latin"]
});

const UrlForm = () => {
    const [url, setUrl] = useState("");
    const [shortened, setShortened] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setMessageType("");
        setShortened("");

        if (!url) {
            setMessage("Please enter a URL.");
            setMessageType("error");
            return;
        }

        if (!isValidUrl(url)) {
            setMessage("The URL is not valid!");
            setMessageType("error");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/shortURL", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),
            });

            const data = await res.json();
            setLoading(false);

            if (res.ok) {
                setShortened(data.url);
                setUrl("");
                setMessage("Shortened URL created!");
                setMessageType("success");
            } else {
                setMessage("Failed to shorten URL.");
                setMessageType("error");
            }
        } catch (error) {
            setLoading(false);
            setMessage("Something went wrong. Please try again.");
            setMessageType("error");
        }
    };

    const copyToClipboard = async () => {
        if (!navigator.clipboard) {
            setMessage("Clipboard API is not supported in this browser.");
            setMessageType("error");
            return;
        }
        try {
            await navigator.clipboard.writeText(shortened);
            setMessage("Copied to clipboard!");
            setMessageType("success");
        } catch (err) {
            console.error("Clipboard error:", err);
            setMessage("Failed to copy. Make sure you're on HTTPS or localhost.");
            setMessageType("error");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`w-[90%] md:w-[60%] lg:w-[45%] border-2 border-black px-6 py-8 bg-gradient-to-br from-blue-700 to-blue-500 rounded-2xl shadow-2xl flex flex-col gap-6 ${QuicksandFont.className}`}
        >
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your long URL here..."
                className="text-black bg-yellow-200 placeholder-gray-600 font-semibold text-xl rounded-xl px-5 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />

            {loading && (
                <div className="flex justify-center items-center text-white text-lg">
                    <Loader2 className="animate-spin mr-2" size={24} />
                    Generating Short URL...
                </div>
            )}

            {shortened && !loading && (
                <div className="flex items-center justify-between bg-yellow-200 text-black px-4 py-3 rounded-xl border-2 border-black">
                    <p className="break-all text-lg font-semibold">{shortened}</p>
                    <button
                        type="button"
                        onClick={copyToClipboard}
                        className="ml-4 bg-black text-white hover:bg-white hover:text-black transition px-4 py-2 text-sm rounded-lg border-2 border-black"
                    >
                        Copy
                    </button>
                </div>
            )}

            {message && (
                <p className={`text-center text-base font-medium ${messageType === "error" ? "text-red-300" : "text-green-200"}`}>
                    {message}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="bg-black text-white hover:bg-white hover:text-black transition px-6 py-3 text-lg rounded-xl border-2 border-white hover:border-black font-semibold tracking-wide"
            >
                {loading ? "Processing..." : "Short URL 🔗"}
            </button>
        </form>
    );
};

function isValidUrl(s) {
    try {
        new URL(s);
        return true;
    } catch (err) {
        return false;
    }
}

export default UrlForm;
