
const Task = require('../models/taskModel');

const createTask = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

const updateTask = async (taskId, updateData) => {
  return await Task.findByIdAndUpdate(taskId, updateData, { new: true });
};

const deleteTask = async (taskId) => {
  return await Task.findByIdAndDelete(taskId);
};

const filterTasks = async (filterCriteria) => {
  return await Task.find(filterCriteria);
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  filterTasks,
};
