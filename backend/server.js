import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRouter from './routes/chat.js';

// Load environment variables from the root .env configuration file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing (CORS) so React (port 5173) can talk to Express (port 5000)
app.use(cors());

// Parse incoming HTTP request payloads as JSON
app.use(express.json());

// Route connections
app.use('/chat', chatRouter);

// Backend diagnostics endpoint to verify if server is running
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Catch-all error routing middleware for unexpected server issues
app.use((err, req, res, next) => {
  console.error('Global Error Handler caught:', err.stack);
  res.status(500).json({ error: 'An unexpected internal server error occurred.' });
});

// Bind server port and start listening
app.listen(port, () => {
  console.log(`=========================================`);
  console.log(`🚀 Mentor Chatbot Backend server running on port: ${port}`);
  console.log(`=========================================`);
});
