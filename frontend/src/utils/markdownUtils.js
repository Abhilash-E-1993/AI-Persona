/**
 * Utility functions for cleaning and processing markdown content
 */

/**
 * Cleans markdown formatting from text
 * Removes hash marks, asterisks, and other markdown syntax
 * @param {string} text - The markdown text to clean
 * @returns {string} - Cleaned text without markdown syntax
 */
export function cleanMarkdownFormatting(text) {
  if (!text) return text;
  
  // Remove markdown headings (# ## ### etc.) and replace with text
  text = text.replace(/^#{1,6}\s+/gm, (match) => {
    // Keep some visual distinction with uppercase
    return '\n\n';
  });
  
  // Clean up bold markers (**text**)
  text = text.replace(/\*\*(.+?)\*\*/g, '$1');
  
  // Clean up italic markers (*text* or _text_)
  text = text.replace(/\*(.+?)\*/g, '$1');
  text = text.replace(/_(.+?)_/g, '$1');
  
  // Clean up multiple newlines
  text = text.replace(/\n{3,}/g, '\n\n');
  
  return text;
}

/**
 * Extracts code blocks and returns structured data
 * @param {string} text - The text with code blocks
 * @returns {Array} - Array of content blocks with type (text or code)
 */
export function extractCodeBlocks(text) {
  const blocks = [];
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    // Add text before the code block
    if (match.index > lastIndex) {
      blocks.push({
        type: 'text',
        content: text.substring(lastIndex, match.index).trim()
      });
    }

    // Add the code block
    blocks.push({
      type: 'code',
      language: match[1] || 'plaintext',
      content: match[2]
    });

    lastIndex = codeBlockRegex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    blocks.push({
      type: 'text',
      content: text.substring(lastIndex).trim()
    });
  }

  // If no blocks were found, return the original text as a single block
  if (blocks.length === 0) {
    blocks.push({
      type: 'text',
      content: text
    });
  }

  return blocks;
}
