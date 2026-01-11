'use client'

import { useState } from 'react'

export default function Demo() {
    const [text, setText] = useState('')
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!text) return;
        setLoading(true);
        try {
            const res = await fetch('/api/demo/blocking', {
                method: 'POST',
                body: JSON.stringify({ prompt: text }),
            });
            const data = await res.json();
            setResponse(data.text);
        } catch (error) {
            console.error("Error:", error);
            setResponse("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 text-white">
            <div className="max-w-xl w-full space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                        AI Demo
                    </h1>
                    <p className="text-neutral-400">Ask anything to Gemini 2.0 Flash</p>
                </div>

                <div className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-neutral-600"
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={loading || !text}
                            className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 rounded-lg font-medium transition-colors text-sm"
                        >
                            {loading ? 'Thinking...' : 'Ask'}
                        </button>
                    </div>

                    {response && (
                        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <p className="leading-relaxed text-neutral-300">{response}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}