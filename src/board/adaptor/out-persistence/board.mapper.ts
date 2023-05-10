import { BoardWindowEntity } from '../../domain/board-window.entity';
import { BoardEntity } from '../../domain/board.entity';
import { BoardOrmEntity } from './board.orm-entity';

export class BoardMapper {
  static mapToBoards(boards: BoardOrmEntity[]) {
    const boardWindowEntity: BoardWindowEntity = new BoardWindowEntity();
    boards.forEach((board: BoardOrmEntity) => {
      const boardEntity = this.mapToBoard(board);
      boardWindowEntity.addBoard(boardEntity);
    });

    return boardWindowEntity.boards;
  }

  static mapToBoard(board: BoardOrmEntity) {
    const boardEntity: BoardEntity = new BoardEntity(
      board.title,
      board.content,
      board.id,
      board.updatedAt,
      board.createdAt,
    );

    return boardEntity;
  }

  static mapToBoardOrmEntity(board: BoardEntity | Partial<BoardEntity>) {
    const boardOrmEntity: BoardOrmEntity = new BoardOrmEntity();
    boardOrmEntity.title = board.title;
    boardOrmEntity.content = board.content;
    if (board.id !== null) {
      boardOrmEntity.id = board.id;
    }
    return boardOrmEntity;
  }
}
