"use client";

import { useState } from "react";
import { FiMessageCircle } from "react-icons/fi"; // Icono de mensaje

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false); // Estado para abrir/cerrar el chatbot
  const [messages, setMessages] = useState([
    { role: "assistant", content: "¡Hola! ¿En qué puedo ayudarte?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages([...messages, newMessage]); // Agrega el mensaje del usuario
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input_text: input }),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.json();
      setMessages([
        ...messages,
        newMessage,
        { role: "assistant", content: data.answer }, // Accede a data.answer
      ]);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setMessages([
        ...messages,
        newMessage,
        {
          role: "assistant",
          content: "Lo siento, no puedo responder en este momento.",
        },
      ]);
    }
  };

  return (
    <div>
      {/* Botón flotante para abrir/cerrar el chatbot */}
      <div
        className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-600 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMessageCircle size={28} />
      </div>

      {/* Chatbot */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 bg-white border rounded shadow-lg w-80 max-h-[70vh] flex flex-col z-50">
          <div className="p-4 border-b bg-blue-500 text-white font-bold">
            Kevinsito
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`my-2 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.content}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t bg-white flex">
            <input
              type="text"
              className="flex-grow border rounded p-2 text-black"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-blue-500 text-white rounded px-4 py-2"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
