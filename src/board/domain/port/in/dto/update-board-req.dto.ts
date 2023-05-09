/* eslint-disable @typescript-eslint/no-empty-function */
import { Expose } from 'class-transformer';
import { BoardEntity } from './../../../entity/board.entity';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { UpdateBoardBodyReq } from './update-board-body-req.dto';

export class UpdateBoardReq extends UpdateBoardBodyReq {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  constructor() {
    super();
  }

  static of(id: number, reqDto: UpdateBoardReq): UpdateBoardReq {
    const dto = new UpdateBoardReq();
    dto.id = id;
    dto.title = reqDto?.title;
    dto.content = reqDto?.content;
    return dto;
  }

  toEntity(): Partial<BoardEntity> {
    return BoardEntity.createBoard(this.title, this.content, this.id);
  }
}
