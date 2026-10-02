import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import healthRoutes from './routes/health.js';
import chapterRoutes from './routes/chapters.js';
import topicRoutes from './routes/topics.js';
import codeRoutes from './routes/codeRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', healthRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/code', codeRoutes);

// Fallback root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to DSAForge API Server',
    endpoints: {
      health: '/api/health',
      chapters: '/api/chapters',
      topics: '/api/topics',
      codeRun: '/api/code/run'
    }
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

// Start Server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[DSAForge Server] Running on http://localhost:${PORT}`);
  });
};

startServer();
