import express from 'express';
import { AppDataSource } from './data-source';
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';
import requestLogger from './middleware/logger.middleware';
import logger from './utility/logger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);


app.get('/health', (req, res) => {
  logger.info("/health accessed");
  res.send('Auth Microservice is running');
});

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);




AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
      logger.info(`Auth Microservice is running on port ${PORT}`);
    });

  })
  .catch((err) => {
    logger.error("Error during Data Source initialization:", err);
  });



