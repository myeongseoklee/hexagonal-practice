/* eslint-disable @typescript-eslint/no-empty-function */
import { Expose } from 'class-transformer';
import { BoardEntity } from '../../../../domain/board.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardReq {
  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  content: string;

  constructor() {}

  static of(reqDto: CreateBoardReq): CreateBoardReq {
    const dto = new CreateBoardReq();
    dto.title = reqDto.title;
    dto.content = reqDto.content;
    return dto;
  }

  toEntity(): Partial<BoardEntity> {
    return BoardEntity.createBoard(this.title, this.content);
  }
}
