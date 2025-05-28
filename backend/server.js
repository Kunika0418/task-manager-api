import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());

// Routes
app.use('/api', taskRoutes);

// Global Error Handler (Enhanced)
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Handle different types of errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: "Invalid data"
    });
  }
  
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: "Invalid data"
    });
  }
  
  if (err.code === 11000) { // MongoDB duplicate key error
    return res.status(400).json({
      success: false,
      message: "Invalid data"
    });
  }
  
  // Default to internal server error
  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

// Handle 404 - Route not found
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
