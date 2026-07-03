/**
 * Trims the conversation history to stay within a reasonable token/context window.
 * Keeps only the most recent N messages (typically 15-20).
 * @param {Array} messages - Array of message objects: { role, content }
 * @param {number} [limit=20] - Maximum number of messages to keep
 * @returns {Array} - The trimmed message array.
 */
export function trimHistory(messages, limit = 20) {
  if (!Array.isArray(messages)) {
    return [];
  }

  // If the conversation is shorter than the limit, return as is
  if (messages.length <= limit) {
    return messages;
  }

  // Slice to get the last `limit` messages (preserving chronological order)
  return messages.slice(messages.length - limit);
}
