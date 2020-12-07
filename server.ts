import express from 'express';
import bodyParser from 'body-parser';

// DB Connection
import { connectToDb } from 'db';

// Types
import { AddressInfo } from 'net';

// Logger
import Logger from 'services/Logger';

// Constants
import constants from 'utils/constants';

// Routes
import idealWeightRoutes from 'routes/idealWeight';

export const run = async (): Promise<void> => {
  // Handle uncaught exceptions/unhandled promise rejections and log them
  process.on('uncaughtException', (e) => {
    Logger.error(`${e.message}\n${e.stack}`);
  });
  process.on('unhandledRejection', (error) => {
    throw error;
  });

  // Connect to DB
  const db = await connectToDb();

  // Init Express App
  const app = express();

  // Inject Middleware
  app.use(bodyParser.json());

  // Inject DB connection

  app.request.db = db;

  // Inject Routes
  app.use('/api/ideal', idealWeightRoutes);

  const api = app.listen(constants.PORT);
  const { port: portNumber } = api.address() as AddressInfo;

  Logger.info(`Server running on PORT ${portNumber}`);
};
