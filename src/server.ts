import express from "express";
import 'dotenv/config'; 
import { connectDB, disconnectDB, prisma } from './config/db';
import apiRoutes from './routes'

const app = express();

app.use(express.json());

app.use('/api', apiRoutes);


const PORT = process.env.PORT || 5001;

const start = async () => {
    await connectDB();
     
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

start();

const shutdown = async (signal: string) => {
    console.log(`${signal} received — shutting down`);
    await disconnectDB();
    process.exit(0);
  };
  process.on('SIGINT', () => shutdown('SIGINT')); // Ctrl+C
  process.on('SIGTERM', () => shutdown('SIGTERM')); // Docker / hosts
  