import { OpenAI } from 'openai';

let openaiClient = null;

/**
 * Returns a singleton instance of the OpenAI client.
 * Lazy initialization ensures the environment is loaded first.
 */
function getOpenAIClient() {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    
    // Check if the API key is set or still has the placeholder text
    if (!apiKey || apiKey === 'your_openai_api_key_here') {
      throw new Error('OpenAI API Key is not configured. Please add your key to the backend .env file.');
    }
    
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
}

/**
 * Sends the system prompt and conversation thread to the OpenAI Chat Completions endpoint.
 * @param {string} systemPrompt - The system instructions setting the mentor's persona.
 * @param {Array} trimmedHistory - The last 15-20 messages in the conversation.
 * @returns {Promise<string>} - The reply content from the AI mentor.
 */
export async function generateChatResponse(systemPrompt, trimmedHistory) {
  const client = getOpenAIClient();
  const model = process.env.OPENAI_MODEL || 'gpt-4o';

  // Compile the prompt payloads for OpenAI
  const messages = [
    { role: 'system', content: systemPrompt },
    ...trimmedHistory
  ];

  try {
    const completion = await client.chat.completions.create({
      model: model,
      messages: messages,
      temperature: 0.7, // Higher value increases naturalness/creative speech pattern
    });

    if (!completion.choices || completion.choices.length === 0) {
      throw new Error('OpenAI returned an empty response list.');
    }

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI SDK API Call Error:', error.message);
    throw error;
  }
}
