import { BoardId } from '../../../domain/board.entity';
import { BoardRes } from './dto/board-res.dto';
import { GetBoardsRes } from './dto/get-boards-res.dto';
import { GetBoardsCommand } from './dto/get-boards.command';

export const GetBoardsUseCaseSymbol = Symbol('GetBoardsUseCase');

export interface GetBoardsUseCase {
  getBoards(command: GetBoardsCommand): Promise<GetBoardsRes>;
  getBoard(boardId: BoardId): Promise<BoardRes>;
}
