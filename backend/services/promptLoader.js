import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Dynamically reads the system prompt file for a specified mentor key.
 * @param {string} mentor - The key of the mentor (e.g., 'hitesh', 'piyush')
 * @returns {string} - The text content of the system prompt.
 * @throws {Error} - If the prompt file is missing or is empty/placeholder.
 */
export function loadSystemPrompt(mentor) {
  if (!mentor) {
    throw new Error('Mentor parameter is required.');
  }

  const promptFileName = `${mentor.toLowerCase()}_system_prompt.txt`;
  const promptFilePath = path.join(__dirname, '..', 'prompts', promptFileName);

  // Check if file exists on disk
  if (!fs.existsSync(promptFilePath)) {
    throw new Error(`System prompt file for mentor "${mentor}" was not found.`);
  }

  const content = fs.readFileSync(promptFilePath, 'utf-8').trim();

  // If the file only has comments starting with '#' or is empty, treat as coming soon
  const lines = content.split('\n').map(l => l.trim());
  const hasContent = lines.some(line => line.length > 0 && !line.startsWith('#'));

  if (!hasContent) {
    throw new Error(`Mentor "${mentor}" is coming soon! Keep an eye out.`);
  }

  return content;
}
