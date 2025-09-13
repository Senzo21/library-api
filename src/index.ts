import express from 'express';
import authorRoutes from './routes/authorRoutes';
import bookRoutes from './routes/bookRoutes';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Library API server running on port ${PORT}`);
});
