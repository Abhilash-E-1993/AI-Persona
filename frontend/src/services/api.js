import axios from 'axios';

// Define the base URL pointing to the Express server (port 5000)
const API_BASE_URL = 'https://ai-persona-e428.onrender.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Communicates with the backend chat service.
 * Sends the selected mentor key and conversation thread array.
 * @param {string} mentor - The key of the selected mentor (e.g. 'hitesh', 'piyush')
 * @param {Array} messages - Thread of conversation message objects: { role, content }
 * @returns {Promise<string>} - The mentor's text reply.
 */
export async function sendChatMessage(mentor, messages) {
  try {
    const response = await apiClient.post('/chat', { mentor, messages });
    
    if (response.data && response.data.reply) {
      return response.data.reply;
    }
    
    throw new Error('Received invalid reply structure from server.');
  } catch (error) {
    // If the server returns a custom error message, bubble it up
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    // Network errors or offline server
    throw new Error('Failed to connect to the AI mentor server. Make sure the backend is running.');
  }
}
