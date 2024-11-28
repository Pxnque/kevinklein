"use client";

import { useState } from "react";

export default function Chatbot() {
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
        body: JSON.stringify({ input_text: input }), // Cambia el nombre de input
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
    <div className="chatbot-container p-4 border rounded shadow-lg max-w-md mx-auto mt-8 bg-white">
      <h2 className="text-lg text-black font-bold mb-2">Asistente Virtual</h2>
      <div className="chatbot-messages h-64 overflow-y-auto border-b p-2 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
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
      <div className="chatbot-input mt-4 flex">
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
  );
}
