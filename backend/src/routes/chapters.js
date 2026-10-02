import express from 'express';
import Chapter from '../models/Chapter.js';
import Topic from '../models/Topic.js';

const router = express.Router();

// Get all chapters with optional topics populated
router.get('/', async (req, res) => {
  try {
    const chapters = await Chapter.find().sort({ order: 1 });
    res.json({ success: true, count: chapters.length, data: chapters });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single chapter by ID
router.get('/:id', async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) {
      return res.status(404).json({ success: false, message: 'Chapter not found' });
    }
    const topics = await Topic.find({ chapterId: chapter._id });
    res.json({ success: true, data: { ...chapter.toJSON(), topics } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new chapter
router.post('/', async (req, res) => {
  try {
    const { title, description, order } = req.body;
    const newChapter = await Chapter.create({ title, description, order });
    res.status(201).json({ success: true, data: newChapter });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
