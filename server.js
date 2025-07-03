// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task'); // we'll create this next

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection (replace with your actual MongoDB URI)
mongoose.connect('mongodb+srv://cyollamenezes3:bfAbAXcOCNFg08ZN@cluster0.0juqyfm.mongodb.net/taskdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  

// Get all tasks
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add a task
app.post('/tasks', async (req, res) => {
  const task = new Task({ text: req.body.text });
  await task.save();
  res.json(task);
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

// Start server
app.listen(5000, () => {
  console.log('✅ Server running on http://localhost:5000');
});
