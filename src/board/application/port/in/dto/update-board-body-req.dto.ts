/* eslint-disable @typescript-eslint/no-empty-function */
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBoardBodyReq {
  @Expose()
  @IsOptional()
  @IsString()
  title?: string;

  @Expose()
  @IsOptional()
  @IsString()
  content?: string;

  constructor() {}
}
