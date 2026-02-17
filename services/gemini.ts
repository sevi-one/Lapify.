
import { GoogleGenAI } from "@google/genai";
import { Laptop, UserPreferences } from "../types";

/**
 * Generates a reasoning for why certain laptops match user preferences using Gemini.
 * Uses gemini-3-pro-preview for complex reasoning tasks as per guidelines.
 */
export async function getSmartRecommendationReasoning(topLaptops: Laptop[], prefs: UserPreferences): Promise<string> {
  // Use the named parameter and direct environment variable access for the API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const laptopSummary = topLaptops.map(l => 
    `- ${l.brand} ${l.model}: $${l.price}, ${l.ramGB}GB RAM, ${l.storageGB}GB Storage, ${l.cpuBrand} CPU, ${l.gpuType} GPU.`
  ).join('\n');

  const prompt = `
    I have a user looking for a laptop with these preferences:
    - Price Range: $${prefs.minPrice} to $${prefs.maxPrice}
    - Preferred Brands: ${prefs.brand || 'No preference'}
    - Type: ${prefs.laptopType}
    - Min RAM: ${prefs.minRAM}GB
    - Min Storage: ${prefs.minStorage}GB
    - Min Screen: ${prefs.minScreenSize}"
    
    Here are the top 3 matches I found:
    ${laptopSummary}
    
    Briefly explain why these specific laptops are great choices for this user. 
    Focus on value for money and performance in 3-4 concise bullet points. 
    Keep it professional but friendly. Do not use Markdown headers.
  `;

  try {
    // Calling generateContent with the model name and prompt directly.
    // gemini-3-pro-preview is selected for complex text tasks (advanced reasoning).
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
    });
    
    // Using the .text property (not a method) to extract the response from GenerateContentResponse.
    return response.text || "Highly recommended for their balance of price and performance based on your requirements.";
  } catch (error) {
    console.error("Gemini error:", error);
    return "These laptops offer the best specs within your price range and preferences.";
  }
}
