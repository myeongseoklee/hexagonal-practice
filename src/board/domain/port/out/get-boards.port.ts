import { GetBoardsCommand } from '../in/dto/get-boards.command';
import { BoardEntity } from '../../entity/board.entity';

export interface GetBoardsPort {
  getBoards(command: GetBoardsCommand): Promise<BoardEntity[]>;
}
