import express from 'express';
import { createTask, getAllTasks } from '../controllers/taskController.js';

const router = express.Router();

router.post('/tasks/create', createTask);
router.get('/tasks/list', getAllTasks);

export default router;
