import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini client helper
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please check your Secrets in Settings.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// API Routes FIRST
app.post("/api/cake-planner", async (req, res) => {
  try {
    const { occasion, servings, flavors, style, additionalInfo } = req.body;

    const prompt = `You are the lead Executive Cake Designer at "Cake Fruition", a luxury bespoke cake studio.
Create a premium, custom cake design proposal for a client with the following details:
- Occasion: ${occasion}
- Intended Servings: ${servings}
- Requested Flavor Profile: ${flavors}
- Desired Style Aesthetic: ${style}
- Additional Details / Special Requests: ${additionalInfo || "None"}

Please design the ultimate bespoke cake. Since "Cake Fruition" has a minimal, black-and-white, luxurious and painterly/editorial brand aesthetic, your design should emphasize gorgeous monochrome details, sophisticated textures (e.g., stone-textured, sculptural folds, delicate rustic buttercream, high-contrast borders, organic drippings, paper-thin petals, or metallic silver accents) while keeping the client's requested style, flavor, and occasion in mind.

Respond with a JSON object matching this schema:
{
  "designName": "Name of the Custom Cake Design Creation (e.g., 'The Ivory Sculptural', 'The Midnight Drip')",
  "conceptDescription": "A beautiful 2-3 sentence luxury design statement outlining the artistic vision.",
  "sizingTiering": "Recommended physical structure (e.g., 'A tall 3-layer 8\" single tier' or 'A elegant 2-tier 8\" & 6\" structured masterpiece')",
  "flavorHarmony": "A description of the cake layers, filling matching, and suggestions to enrich the flavor profile.",
  "finishingDetails": "Description of the frosting texture, decorations, patterns, and cake board minimalist accent styling.",
  "whatsappSummary": "A beautifully drafted, friendly, high-conversion consultation summary starting with 'Hi Cake Fruition!' that includes these options, servings details, and style selections, ending with a request for quotation, which the user can directly send as a text message via WhatsApp to finalize their order."
}

Ensure the response is strict, valid JSON. Do not include markdown codeblocks or any enclosing wrapper outside the valid JSON object itself. Ensure the tone is luxurious, artisan-focused, warm, and professional.`;

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["designName", "conceptDescription", "sizingTiering", "flavorHarmony", "finishingDetails", "whatsappSummary"],
          properties: {
            designName: { type: Type.STRING },
            conceptDescription: { type: Type.STRING },
            sizingTiering: { type: Type.STRING },
            flavorHarmony: { type: Type.STRING },
            finishingDetails: { type: Type.STRING },
            whatsappSummary: { type: Type.STRING },
          },
        },
      },
    });

    const textOutput = response.text?.trim() || "{}";
    const data = JSON.parse(textOutput);
    res.json(data);
  } catch (error: any) {
    console.error("Error in AI Cake Planner API:", error);
    res.status(500).json({ error: error?.message || "Failed to generate cake design proposal. Is the GEMINI_API_KEY set?" });
  }
});

// Vite middleware flow for development or Static server for production
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Cake Fruition Server running at http://localhost:${PORT}`);
  });
}

setupVite();
