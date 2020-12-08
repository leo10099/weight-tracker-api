import { Collection } from 'mongodb';

// Models
import IdealWeigth from 'models/IdealWeight';

// Validations
import { validate, ValidationError } from 'class-validator';

/* List All */
export const getAll = async (
  collection?: Collection<IdealWeigth>,
): Promise<IdealWeigth[] | undefined> => {
  return await collection?.find().toArray();
};

/* List By User ID */
export const getByUserId = async (
  userId: string,
  collection?: Collection<IdealWeigth>,
): Promise<IdealWeigth | null | undefined> => {
  return await collection?.findOne({ userId });
};

/* Create */
export const save = async (
  idealWeightData: IdealWeigth,
  collection?: Collection<IdealWeigth>,
): Promise<{ data?: IdealWeigth | null; errors: ValidationError[] | null }> => {
  const newIdealWeight = new IdealWeigth();
  newIdealWeight.idealWeight = idealWeightData.idealWeight;
  newIdealWeight.userId = idealWeightData.userId;

  const errors = await validate(newIdealWeight);

  if (errors?.length) {
    return {
      data: null,
      errors,
    };
  }

  const alreadyExists = await collection?.findOne(newIdealWeight);

  if (alreadyExists)
    return {
      data: alreadyExists,
      errors: null,
    };

  const result = await collection?.insertOne(newIdealWeight);

  return {
    data: result?.ops[0],
    errors: null,
  };
};
