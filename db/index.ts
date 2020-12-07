import { Db, MongoClient } from 'mongodb';

// Constants
import constants from 'utils/constants';

// Logger
import Logger from 'services/Logger';

const url = `mongodb+srv://${constants.DB_USER}:${constants.DB_PASSWORD}@${constants.DB_CLUSTER}/${constants.DB_NAME}?retryWrites=true&w=majority`;

export const connectToDb = async (): Promise<Db> => {
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = await client.db(process.env.DB_NAME);
    if (client.isConnected()) Logger.info('Connected to database');

    return db;
  } catch (e) {
    Logger.error(e);
    throw new Error(e);
  }
};
