import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not defined. AI features will be disabled.");
}

export const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const DEFAULT_MODEL = "gemini-3-flash-preview";

export async function askGemini(prompt: string, context?: string) {
  if (!ai) {
    throw new Error("Gemini AI is not properly configured.");
  }

  const systemInstruction = `You are a helpful education assistant named "Icarus AI". 
  Your goal is to clear students' doubts about their curriculum in simpler words. 
  The student is using "Project Icarus", a proof-of-effort learning platform.
  Be encouraging, concise, and easy to understand.
  Context: ${context || "General learning queries."}`;

  try {
    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: prompt,
      config: {
        systemInstruction,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}

export async function extractCourseFromWeb(url: string, pageContent: string) {
  if (!ai) {
    throw new Error("Gemini AI is not properly configured.");
  }

  const prompt = `Extract course information from the following webpage content for the URL: ${url}.
  If the page is not clearly a course, try to interpret it as an educational resource and create a structured learning module from it.
  
  Content:
  ${pageContent.substring(0, 5000)} // Truncate to avoid token limits
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: "Title of the course" },
      platform: { type: Type.STRING, description: "Platform name (e.g. YouTube, Coursera)" },
      description: { type: Type.STRING, description: "Brief description of the course" },
      category: { 
        type: Type.STRING, 
        enum: ["Coding", "Blockchain", "AI", "General Tech"],
        description: "Best fitting category"
      },
      rewardValue: { type: Type.NUMBER, description: "Suggested reward value in INR between 1000 and 10000 based on complexity" },
      questions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.NUMBER, description: "Index of the correct answer (0-3)" }
          },
          required: ["text", "options", "correctAnswer"]
        },
        description: "A set of exactly 10 multiple choice questions to verify learning"
      }
    },
    required: ["title", "platform", "description", "category", "rewardValue", "questions"]
  };

  try {
    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema,
        systemInstruction: "You are an expert curriculum designer. Extract or generate high-quality educational content and verification questions from the provided web content. Ensure questions have exactly 4 options and a clear correct answer."
      }
    });

    const data = JSON.parse(response.text);
    return data;
  } catch (error) {
    console.error("Course Extraction Error:", error);
    throw error;
  }
}

export async function suggestCurriculumByBudget(budget: number, ageRange: string) {
  if (!ai) {
    throw new Error("Gemini AI is not properly configured.");
  }

  const prompt = `Suggest a new educational course/module for a "Proof-of-Effort" charitable ecosystem.
  The current treasury balance is ₹${budget}. 
  The target learner age group is ${ageRange}.
  
  Provide a course that fits this budget (rewardValue should be roughly 5-10% of the total budget, but between 1000 and 10000).
  The course should be relevant to modern tech (AI, Coding, Blockchain, or General Tech).
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      platform: { type: Type.STRING },
      description: { type: Type.STRING },
      category: { type: Type.STRING, enum: ["Coding", "Blockchain", "AI", "General Tech"] },
      rewardValue: { type: Type.NUMBER },
      questions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.NUMBER }
          },
          required: ["text", "options", "correctAnswer"]
        },
        description: "Exactly 5 verification questions."
      }
    },
    required: ["title", "platform", "description", "category", "rewardValue", "questions"]
  };

  try {
    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema,
        systemInstruction: "You are an AI Treasury Manager. Your goal is to allocate funds to high-impact educational content. Create high-quality, verified learning modules."
      }
    });

    const data = JSON.parse(response.text);
    return data;
  } catch (error) {
    console.error("Budget Suggestion Error:", error);
    throw error;
  }
}

export async function getComfortingResponse(message: string) {
  if (!ai) {
    throw new Error("Gemini AI is not properly configured.");
  }

  const systemInstruction = `You are a gentle, kind, and supportive emotional companion for children.
  Your name is "Aura". Your voice is warm and comforting.
  When a child talks to you, listen carefully and respond with empathy.
  Help them feel safe, heard, and understood. 
  If they are sad, offer a virtual hug or a kind word.
  If they are happy, celebrate with them.
  Keep your responses short, simple, and very child-friendly (ages 5-12).
  Avoid complex words. Use analogies like "little clouds in the sky" or "warm sunshine".
  CRITICAL: You are NOT a replacement for a real therapist or parent. 
  If a child mentions harm or danger, gently suggest they talk to a grown-up they trust.
  Otherwise, focus on emotional validation and simple comfort.`;

  try {
    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: message,
      config: {
        systemInstruction,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Aura Companion Error:", error);
    throw error;
  }
}
