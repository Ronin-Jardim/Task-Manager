const Task = require("../models/tasks");

exports.deleteTask = async (req, res) => {
  try {
    const result = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!result) {
      return res.status(404).json({ message: 'Task not found or you do not have permission to delete it' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
