import { BoardEntity, BoardId } from '../../../domain/board.entity';

export interface GetBoardPort {
  getBoard(boardId: BoardId): Promise<BoardEntity>;
  isExistById(id: BoardId): Promise<boolean>;
}
