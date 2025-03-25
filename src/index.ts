import express from 'express';
import { AppDataSource } from './data-source';


const app = express();

app.get('/health', (req, res) => {
  res.send('Auth Microservice is running');
});

AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(3000, () => {
      console.log('Auth Microservice is running on port 3000');
    });

  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });



