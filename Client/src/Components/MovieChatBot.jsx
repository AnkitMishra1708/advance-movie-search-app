import React, { useEffect, useRef, useState } from "react";
import Api from "../Helper/Api";
import { MessageCircle, Send, X } from "lucide-react";

const MovieChatBot = () => {

    const [openModal, setOpenModal] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([
        {
            role: "ai",
            text: "Hi, I am PotatoAI Ask me anything about movies!",
        },
    ]);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    const sendMessage = async () => {

        if (!message.trim() || loading) return;

        const currentMessage = message;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                text: currentMessage,
            },
        ]);

        setMessage("");
        setLoading(true);

        try {

            const res = await Api.post(
                "/chat/chatWithAi",
                {
                    message: currentMessage,
                }
            );

            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    text: res.data.reply,
                },
            ]);

        } catch (error) {

            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    text: "Something went wrong 😢",
                },
            ]);

        }

        setLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <>

            <button
                onClick={() => setOpenModal(true)}
                className="fixed bottom-5 right-5 z-40 w-16 h-16 rounded-full bg-green-500 hover:bg-green-500 shadow-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            >
                <MessageCircle size={30} />
            </button>

            {openModal && (

                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

                    <div className="bg-[#111111] text-white rounded-2xl w-[95%] max-w-4xl h-[90vh] border border-zinc-800 flex flex-col overflow-hidden shadow-2xl">

                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#181818]">

                            <div>
                                <h2 className="text-3xl font-bold">
                                    PotatoAI
                                </h2>

                                <p className="text-zinc-400 text-sm mt-1">
                                    Your AI Movie Assistant
                                </p>
                            </div>

                            <button
                                onClick={() => setOpenModal(false)}
                                className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-red-600 transition-all duration-300 flex items-center justify-center"
                            >
                                <X size={22} />
                            </button>

                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#0d0d0d]">

                            {messages.map((msg, index) => (

                                <div
                                    key={index}
                                    className={`flex ${msg.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                        }`}
                                >

                                    <div
                                        className={`max-w-[75%] px-5 py-4 rounded-2xl text-lg leading-relaxed ${msg.role === "user"
                                            ? "bg-green-500 text-white rounded-br-sm"
                                            : "bg-zinc-900 border border-zinc-700 text-zinc-100 rounded-bl-sm"
                                            }`}
                                    >

                                        {msg.text}

                                    </div>

                                </div>

                            ))}

                            {loading && (

                                <div className="flex justify-start">

                                    <div className="bg-zinc-900 border border-zinc-700 px-5 py-4 rounded-2xl text-zinc-300">

                                        CineBot is typing...

                                    </div>

                                </div>

                            )}

                            <div ref={bottomRef}></div>

                        </div>

                        <div className="p-4 border-t border-zinc-800 bg-[#111111]">

                            <div className="flex items-center gap-3">

                                <input
                                    type="text"
                                    placeholder="Ask about movies..."
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(e.target.value)
                                    }
                                    onKeyDown={handleKeyDown}
                                    className="flex-1 px-5 py-4 rounded-xl bg-zinc-900 border border-zinc-700 outline-none focus:border-gray-500"
                                />

                                <button
                                    onClick={sendMessage}
                                    disabled={loading}
                                    className="w-14 h-14 rounded-xl bg-green-500 hover:bg-green-500 transition-all duration-300 flex items-center justify-center"
                                >

                                    <Send size={20} />

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
};

export default MovieChatBot;