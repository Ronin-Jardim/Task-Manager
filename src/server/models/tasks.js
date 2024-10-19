
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: String,
    description: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
