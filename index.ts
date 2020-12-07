import express from 'express';
import dotenv from 'dotenv';

// Types
import { AddressInfo } from 'net';

// Logger
import Logger from 'services/Logger';

// Constants
import constants from 'utils/constants';

const run = async () => {
  // Handle uncaught exceptions/unhandled promise rejections and log them
  process.on('uncaughtException', (e) => {
    Logger.error(`${e.message}\n${e.stack}`);
  });
  process.on('unhandledRejection', (error) => {
    throw error;
  });

  dotenv.config();

  const app = express().listen(constants.PORT);
  const { port: portNumber } = app.address() as AddressInfo;

  Logger.info(`Server running on PORT: ${portNumber}`);
};

run();
