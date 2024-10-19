const Task = require("../models/tasks");
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found or you do not have permission to update it' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};
