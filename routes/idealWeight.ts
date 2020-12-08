import express, { Request, Response } from 'express';

// Handlers;
import { save, getAll, getByUserId, deleteOne } from 'controllers/idealWeight';

const COLLECTION_NAME = 'idealWeight';

const idealWeightRoutes = express.Router();

/* Get All */
idealWeightRoutes.get('/', async (req: Request, res: Response) => {
  const result = await getAll(req.db.collection(COLLECTION_NAME));

  return res.status(200).json(result);
});

/* Get One by User ID */
idealWeightRoutes.get('/:userId', async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result = await getByUserId(userId, req.db.collection(COLLECTION_NAME));

  return res.status(200).json(result);
});

/* Create new */
idealWeightRoutes.post('/', async (req: Request, res: Response) => {
  const result = await save(req.body, req.db.collection(COLLECTION_NAME));

  if (result.errors) {
    return res.status(400).json(result.errors);
  }

  return res.status(200).json(result.data);
});

/* Delete One by User */
idealWeightRoutes.delete('/:userId', async (req: Request, res: Response) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({
      data: null,
      errors: [{ property: 'userId', constraints: 'userId should not be empty' }],
    });
  }
  const result = await deleteOne(userId, req.db.collection(COLLECTION_NAME));

  return res.status(200).json(!!result);
});

export default idealWeightRoutes;
