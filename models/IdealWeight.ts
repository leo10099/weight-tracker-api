import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export default class IdealWeigth {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsInt()
  idealWeight: number;

  @IsInt()
  currentWeight?: number;
}
