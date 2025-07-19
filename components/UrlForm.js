"use client";

import { useState } from "react";
import { Quicksand } from 'next/font/google';

const QuicksandFont = Quicksand({
    weight: "700",
    subsets:["latin"]
})

const UrlForm = () => {
    const [url, setUrl] = useState("");
    const [shortened, setShortened] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setMessageType("");

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

        try {
            const res = await fetch("/api/shortURL", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),
            });

            const data = await res.json();

            if (res.ok) {
                setShortened(data.url);
                setUrl("");
                setMessage("Shortened URL created!");
                setMessageType("success");
            } else {
                setShortened("");
                setMessage("Failed to shorten URL.");
                setMessageType("error");
            }
        } catch (error) {
            setShortened("");
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
            className={`w-[90%] md:w-[60%] lg:w-[45%] border-2 px-4 py-6 flex flex-col bg-blue-600 gap-4 font-bold text-3xl rounded-md  ${QuicksandFont.className} `}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
                value={url}
                className="rounded-lg border-2 px-2 py-1 overflow-auto text-black bg-yellow-300"
            />

            {shortened && (
                <div className="w-full flex justify-between gap-2">
                    <p className="flex-1 bg-yellow-300 rounded-lg border-2 px-2 py-1 overflow-auto text-black">
                        {shortened}
                    </p>
                    <button
                        type="button"
                        onClick={copyToClipboard}
                        className="bg-gray-500 hover:bg-gray-300 duration-500 px-2 text-white hover:text-black rounded-sm"
                    >
                        Copy
                    </button>
                </div>
            )}

            {message && (
                <p className={`text-lg ${messageType === "error" ? "text-red-500" : "text-green-300"} text-center`}>
                    {message}
                </p>
            )}

            <button
                className="bg-gray-500 hover:bg-gray-300 duration-500 px-2 text-white hover:text-black
                rounded-md inline-flex items-center justify-center border-2 border-black hover:border-white py-1"
                type="submit"
            >
                Short URL🔗
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
