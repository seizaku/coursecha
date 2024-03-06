import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const Gemini = async ({ parts }, temp = 0.8) => {
  const API_KEY = process.env.GOOGLE_API_KEY;

  if (!API_KEY) {
    console.log(API_KEY);
    throw new Error("Google API Key was not found!");
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-001" });

  const generationConfig = {
    max_output_tokens: 8192,
    temperature: temp,
  };

  const result = await model.generateContentStream({
    contents: [{ role: "user", parts }],
    generationConfig,
  });

  for await (const item of result.stream) {
    console.log(item.text());
  }

  const response = (await result.response).text();
  return response;
};

export default Gemini;
