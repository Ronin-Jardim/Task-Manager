
const Task = require("../models/tasks");

exports.addTask = async (req, res) => {
    try {
        const { taskName, description } = req.body;
        const userId = req.userId; // This comes from the authMiddleware

        const newTask = new Task({ 
            taskName, 
            description,
            userId
        });
      
    
        const task = await newTask.save();
        res.status(201).json({data: {_id:task._id, taskName, description, userId}, message: 'Task is created successfully' });
    } catch (error) {
        console.error('Error creating Task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}




