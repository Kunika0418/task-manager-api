const Task = require('../models/Task');

// POST /tasks
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET /tasks?search=&status=&priority=&page=&limit=&sortBy=
exports.getTasks = async (req, res) => {
  const { search, status, priority, page = 1, limit = 10, sortBy } = req.query;
  const query = {};

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  if (status) {
    query.status = status;
  }

  if (priority) {
    query.priority = priority;
  }

  let sort = {};
  if (sortBy === 'dueDate') sort.dueDate = 1;
  if (sortBy === 'priority') sort.priority = 1;

  try {
    const tasks = await Task.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Task.countDocuments(query);

    res.json({
      tasks,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
