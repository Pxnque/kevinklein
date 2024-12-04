import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

const BOTSONIC_API_URL = "https://api-azure.botsonic.ai/v1/botsonic/generate";
const API_TOKEN = "39a74205-ccda-4eb1-aa3b-db5b34b9d6df";

export async function POST(request: Request) {
  try {
    const { input_text, chat_id } = await request.json();

    if (!input_text) {
      return NextResponse.json(
        { error: "input_text is required" },
        { status: 400 }
      );
    }

    // Genera un UUID si no se proporciona un chat_id
    const validChatId = chat_id || uuidv4();

    const response = await fetch(BOTSONIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: API_TOKEN,
      },
      body: JSON.stringify({ input_text, chat_id: validChatId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Error from Botsonic: ${response.statusText} - ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
