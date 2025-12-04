import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateAestheticImage = async (styleDescription: string = "minimalist aesthetic"): Promise<string> => {
  const ai = getClient();
  
  // Using gemini-2.5-flash-image for speed and efficiency for preview purposes.
  // Switch to gemini-3-pro-image-preview if 4k resolution is needed.
  const model = "gemini-2.5-flash-image"; 
  
  const prompt = `A high-quality, professional, ${styleDescription} instagram photo. Minimalist, clean composition, trending on social media. Do not include text. Square aspect ratio.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
            aspectRatio: "1:1",
        }
      }
    });

    // Extract base64 image from the response
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData && part.inlineData.data) {
         return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image data returned from Gemini.");
  } catch (error) {
    console.error("Error generating aesthetic image:", error);
    throw error;
  }
};