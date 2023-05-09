import { BoardEntity } from './board.entity';

export class BoardWindowEntity {
  constructor(private readonly _boards: BoardEntity[] = []) {}

  get boards() {
    return this._boards;
  }

  addBoard(board: BoardEntity) {
    this.boards.push(board);
    return this;
  }
}
