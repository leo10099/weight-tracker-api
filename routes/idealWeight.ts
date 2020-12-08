import express, { Request, Response } from 'express';

// Errors
import { BadRequest } from 'http-errors';

// Handlers;
import { save, getAll, getByUserId } from 'controllers/idealWeight';

const COLLECTION_NAME = 'idealWeight';

const idealWeightRoutes = express.Router();

/* Get All */
idealWeightRoutes.get('/', async (req: Request, res: Response) => {
  const result = await getAll(req.db.collection(COLLECTION_NAME));

  return res.status(200).json(result);
});

/* Get by UserId */
idealWeightRoutes.get('/:userId', async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result = await getByUserId(userId, req.db.collection(COLLECTION_NAME));

  return res.status(200).json(result);
});

/* Create new */
idealWeightRoutes.post('/', async (req: Request, res: Response) => {
  const result = await save(req.body, req.db.collection(COLLECTION_NAME));

  if (result.errors) {
    return res.status(new BadRequest().status).json(result.errors);
  }

  return res.status(200).json(result.data);
});

export default idealWeightRoutes;
