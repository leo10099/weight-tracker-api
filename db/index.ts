import { Db, MongoClient } from 'mongodb';

// Logger
import Logger from 'services/Logger';

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Db> => {
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const connection = await client.db(process.env.DB_NAME);
    return connection;
  } catch (e) {
    Logger.error(e);
    throw new Error(e);
  }
};
