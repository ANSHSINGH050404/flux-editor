import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { tr } from "date-fns/locale";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    // Validate prompt
    if (!prompt || typeof prompt !== 'string') {
      return Response.json(
        { error: "Invalid prompt provided" }, 
        { status: 400 }
      );
    }

    const response = await generateText({
      model: google("gemini-2.5-flash"), // Note: use "exp" suffix for experimental
      prompt: prompt,
      experimental_telemetry:{
        isEnabled:true,
        recordInputs:true,
        recordOutputs:true
      }
       
    });

    return Response.json({ text: response.text });
  } catch (error) {
    console.error("Error generating text:", error);
    
    // More specific error handling
    if (error instanceof Error) {
      return Response.json(
        { error: error.message }, 
        { status: 500 }
      );
    }
    
    return Response.json(
      { error: "Failed to generate text" }, 
      { status: 500 }
    );
  }
}
