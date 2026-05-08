import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import { ethers } from "ethers";

// Mocking the Agent's Blockchain Interaction
const VERIFIER_PRIVATE_KEY = process.env.VERIFIER_PRIVATE_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const provider = new ethers.JsonRpcProvider("https://rpc.antigravity.l1"); // Mock URL

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes for Project Icarus
  
  /**
   * @route POST /api/verify-milestone
   * @description Receives LMS webhook, performs check, and releases funds.
   */
  app.post("/api/verify-milestone", async (req, res) => {
    const { learnerId, moduleId, qualityScore, rewardValue } = req.body;

    console.log(`[VerifierAgent] Verifying milestone for Learner: ${learnerId}, Module: ${moduleId}`);

    // In a real scenario, we would fetch the content from submissionUrl 
    // and run it through an LLM to check for quality/plagiarism.
    // For this MVP, we assume the frontend/LMS provides the score.
    
    if (qualityScore < 0.7) {
      return res.status(400).json({ 
        success: false, 
        message: "Quality check failed. Effort insufficient for fund release." 
      });
    }

    try {
      console.log(`[VerifierAgent] Quality Check Passed (${qualityScore}). Triggering IcarusVault release...`);
      
      // Simulate On-Chain Transaction
      // const vaultContract = new ethers.Contract(VAULT_ADDRESS, VAULT_ABI, wallet);
      // const tx = await vaultContract.releaseFunds(escrowId, orphanageTreasury);
      
      const txHash = ethers.hexlify(ethers.randomBytes(32));
      
      res.json({
        success: true,
        message: "Gravity Shift initiated. Funds released to Orphanage Treasury.",
        txHash: txHash,
        unlockAmount: `₹${(rewardValue || 4000).toLocaleString()}`
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Blockchain transaction failed." });
    }
  });

  /**
   * @route POST /api/issue-sbt
   * @description Mints Skill Fragment SBT for the learner.
   */
  app.post("/api/issue-sbt", async (req, res) => {
    const { learnerAddress, skillName } = req.body;
    
    console.log(`[VerifierAgent] Minting Skill Fragment: ${skillName} for ${learnerAddress}`);
    
    const tokenId = Math.floor(Math.random() * 1000000);
    const txHash = ethers.hexlify(ethers.randomBytes(32));

    res.json({
      success: true,
      message: "Skill Fragment Minted (Soulbound).",
      tokenId,
      txHash
    });
  });

  /**
   * @route GET /api/fetch-url
   * @description Fetches the text content of a URL for course parsing.
   */
  app.get("/api/fetch-url", async (req, res) => {
    const { url } = req.query;
    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "URL is required" });
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch URL: ${response.statusText}`);
      }
      const html = await response.text();
      // Simple strip tags to reduce token count for Gemini
      const text = html.replace(/<script\b[^<]*>([\s\S]*?)<\/script>/gim, "")
                       .replace(/<style\b[^<]*>([\s\S]*?)<\/style>/gim, "")
                       .replace(/<[^>]*>?/gm, " ")
                       .replace(/\s+/g, " ")
                       .trim();
      
      res.json({ content: text.substring(0, 10000) });
    } catch (error) {
      console.error("Fetch Error:", error);
      res.status(500).json({ error: "Failed to fetch webpage content" });
    }
  });

  /**
   * @route POST /api/tts
   * @description ElevenLabs Proxy to keep API Key secure.
   */
  app.post("/api/tts", async (req, res) => {
    const { text, voiceId } = req.body;
    const apiKey = process.env.ELEVEN_LABS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "ElevenLabs API Key not configured." });
    }

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId || '21m00Tcm4TlvDq8ikWAM'}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.statusText}`);
      }

      const buffer = await response.arrayBuffer();
      res.set("Content-Type", "audio/mpeg");
      res.send(Buffer.from(buffer));
    } catch (error) {
      console.error("TTS Error:", error);
      res.status(500).json({ error: "Failed to generate speech" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
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
    console.log(`Icarus Agentic Server running on http://localhost:${PORT}`);
  });
}

startServer();
