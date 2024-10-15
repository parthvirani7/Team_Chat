const Task = require('../models/taskModel');

// Create a new task
const createTask = async (req, res) => {
  const { title, description, assignedTo, dueDate } = req.body;
  
  try {
    const task = await Task.create({ title, description, assignedTo, dueDate });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Filter tasks (by status, assigned user, due date, etc.)
const getTasks = async (req, res) => {
  const { status, assignedTo, dueDate } = req.query;
  const query = {};

  if (status) query.status = status;
  if (assignedTo) query.assignedTo = assignedTo;
  if (dueDate) query.dueDate = { $lte: dueDate };  // Fetch tasks due by the provided date

  try {
    const tasks = await Task.find(query).populate('assignedTo', 'name email');
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports ={
    getTasks,deleteTask,updateTask,createTask
}