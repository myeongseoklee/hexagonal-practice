import { BoardEntity, BoardId } from '../../entity/board.entity';

export interface GetBoardPort {
  getBoard(boardId: BoardId): Promise<BoardEntity>;
  isExistById(id: BoardId): Promise<boolean>;
}
