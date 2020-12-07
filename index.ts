import express from 'express';
import dotenv from 'dotenv';

// Constants
import constants from 'utils/constants';

const bootstrap = async () => {
  dotenv.config();
  const app = express();

  app.listen(constants.PORT);
};

bootstrap();
