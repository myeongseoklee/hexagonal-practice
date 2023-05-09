import { BoardId } from '../../entity/board.entity';
import { BoardRes } from './dto/board-res.dto';
import { CreateBoardReq } from './dto/create-board-req.dto';
import { UpdateBoardBodyReq } from './dto/update-board-body-req.dto';

export const HandleBoardUseCaseSymbol = Symbol('HandleBoardUseCase');

export interface HandleBoardUseCase {
  createBoard(dto: CreateBoardReq): Promise<BoardRes>;
  updateBoard(id: BoardId, dto: UpdateBoardBodyReq): Promise<BoardRes>;
  deleteBoard(id: BoardId): Promise<null>;
}
