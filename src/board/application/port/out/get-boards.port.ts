import { GetBoardsCommand } from '../in/dto/get-boards.command';
import { BoardEntity } from '../../../domain/board.entity';

export interface GetBoardsPort {
  getBoards(command: GetBoardsCommand): Promise<BoardEntity[]>;
}
