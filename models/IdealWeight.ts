import { IsInt, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export default class IdealWeigth {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsInt()
  idealWeight: number;

  @IsInt()
  @IsOptional()
  currentWeight?: number;
}
