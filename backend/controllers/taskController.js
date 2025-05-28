import Task from '../models/Task.js';

// POST /api/tasks
export const createTask = async (req, res, next) => {
  try {
    // Input validation
    const { title } = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Invalid data"
      });
    }

    // Validate enum values if provided
    if (req.body.status && !['pending', 'in progress', 'completed'].includes(req.body.status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid data"
      });
    }

    if (req.body.priority && !['low', 'medium', 'high'].includes(req.body.priority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid data"
      });
    }

    const task = await Task.create(req.body);
    res.status(201).json({ success: true, task });
  } catch (error) {
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: "Invalid data"
      });
    }
    next(error);
  }
};

// GET /api/tasks/list
export const getAllTasks = async (req, res, next) => {
  try {
    const { search, status, priority, page = 1, limit = 10, sortBy, order = 'asc' } = req.query;
    
    // Validate query parameters
    if (status && !['pending', 'in progress', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid data"
      });
    }

    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid data"
      });
    }

    if (page && (isNaN(page) || page < 1)) {
      return res.status(400).json({
        success: false,
        message: "Invalid data"
      });
    }

    if (limit && (isNaN(limit) || limit < 1 || limit > 100)) {
      return res.status(400).json({
        success: false,
        message: "Invalid data"
      });
    }

    const query = {};

    if (search) query.title = { $regex: search, $options: 'i' };
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const sortOptions = {};
    if (sortBy) sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    const tasks = await Task.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Task.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      tasks
    });
  } catch (error) {
    next(error);
  }
};
