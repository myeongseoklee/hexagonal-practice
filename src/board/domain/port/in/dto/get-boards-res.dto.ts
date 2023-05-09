import { Exclude, Expose } from 'class-transformer';
import { BoardRes } from './board-res.dto';

export class GetBoardsRes {
  @Exclude() private readonly _boards: BoardRes[];

  constructor(boards: BoardRes[]) {
    this._boards = boards;
  }

  @Expose() get boards() {
    return this._boards;
  }
}
