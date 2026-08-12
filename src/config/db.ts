import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const adaper = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});

const prisma = new PrismaClient({
  adapter: adaper,
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'info', 'warn', 'error']
      : ['error'],
});

const connectDB = async () => {
try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('Connected to database');
} catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error connecting to database', message);
    process.exit(1);
}
};

const disconnectDB = async () => {
try {
    await prisma.$disconnect();
    console.log('Disconnected from database');
} catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error disconnecting from database', message);
    process.exit(1);
}
}

export {prisma, connectDB, disconnectDB};