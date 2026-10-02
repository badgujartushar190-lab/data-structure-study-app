import express from 'express';
import Topic from '../models/Topic.js';

const router = express.Router();

// Get all topics
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find().populate('chapterId', 'title order');
    res.json({ success: true, count: topics.length, data: topics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get topics by chapter ID
router.get('/chapter/:chapterId', async (req, res) => {
  try {
    const topics = await Topic.find({ chapterId: req.params.chapterId });
    res.json({ success: true, count: topics.length, data: topics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single topic by ID
router.get('/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ success: false, message: 'Topic not found' });
    }
    res.json({ success: true, data: topic });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new topic
router.post('/', async (req, res) => {
  try {
    const { chapterId, title, content, complexity } = req.body;
    const newTopic = await Topic.create({ chapterId, title, content, complexity });
    res.status(201).json({ success: true, data: newTopic });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
