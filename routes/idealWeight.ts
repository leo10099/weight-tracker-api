import express, { Request, Response } from 'express';

// Errors
import { BadRequest } from 'http-errors';

// Handlers;
import { save } from 'controllers/idealWeight';

const COLLECTION_NAME = 'idealWeight';

const idealWeightRoutes = express.Router();

// Create Ideal Weight
idealWeightRoutes.post('/', async (req: Request, res: Response) => {
  const result = await save(req.body, req.db.collection(COLLECTION_NAME));

  if (result.errors) {
    return res.status(new BadRequest().status).json(result.errors);
  }

  return res.status(200).json(result.data);
});

export default idealWeightRoutes;
