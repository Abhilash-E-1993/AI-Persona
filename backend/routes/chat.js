import express from 'express';
import { loadSystemPrompt } from '../services/promptLoader.js';
import { trimHistory } from '../services/chatMemory.js';
import { generateChatResponse } from '../services/aiService.js';

const router = express.Router();

/**
 * POST /chat
 * Receives the current mentor identifier and the conversation history.
 * Responds with the mentor's customized persona response.
 */
router.post('/', async (req, res) => {
  const { mentor, messages } = req.body;

  // Validate incoming body payload
  if (!mentor) {
    return res.status(400).json({ error: 'Mentor key is required in request body.' });
  }
  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required in request body.' });
  }

  try {
    // 1. Load the text file containing the mentor system prompt
    const systemPrompt = loadSystemPrompt(mentor);

    // 2. Trim history down to the last 20 messages to preserve context window
    const trimmedHistory = trimHistory(messages, 20);

    // 3. Get response from OpenAI SDK wrapper
    const reply = await generateChatResponse(systemPrompt, trimmedHistory);

    // 4. Return success response
    return res.json({ reply });

  } catch (error) {
    console.error('Error in chat route controller:', error.message);

    // Handle "Coming Soon" mentor file placeholders (404 Not Found)
    if (error.message.includes('coming soon') || error.message.includes('was not found')) {
      return res.status(404).json({ error: error.message });
    }

    // Handle unconfigured API keys (401 Unauthorized)
    if (error.message.includes('API Key')) {
      return res.status(401).json({ error: error.message });
    }

    // Handle general OpenAI client or network exceptions (500 Server Error)
    return res.status(500).json({ 
      error: 'Unable to communicate with the mentor. Please double-check backend server log details.' 
    });
  }
});

export default router;
