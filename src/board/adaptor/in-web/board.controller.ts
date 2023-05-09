import { RolesGuard } from './../../../auth/guard/role.guard';
import { Role } from '../../../auth/enum/role.enum';
import { Roles } from '../../../auth/decorator/role.decorator';
import { AuthGuard } from '../../../auth/guard/auth.guard';
import { UpdateBoardValidationPipe } from '../../domain/port/in/pipe/update-board-validation.pipe';
import { UpdateBoardBodyReq } from './../../domain/port/in/dto/update-board-body-req.dto';
import {
  HandleBoardUseCase,
  HandleBoardUseCaseSymbol,
} from '../../domain/port/in/handle-board.use-case';
import { BoardId } from '../../domain/entity/board.entity';
import { CreateBoardReq } from '../../domain/port/in/dto/create-board-req.dto';
import { ResponseEntity } from '../../../common/res/response.entity';
import { GetBoardsCommand } from '../../domain/port/in/dto/get-boards.command';
import {
  GetBoardsUseCase,
  GetBoardsUseCaseSymbol,
} from '../../domain/port/in/get-boards.use-case';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

@Controller('board')
export class BoardController {
  constructor(
    @Inject(GetBoardsUseCaseSymbol)
    private readonly _getBoardsUseCase: GetBoardsUseCase,
    @Inject(HandleBoardUseCaseSymbol)
    private readonly _handleBoardUseCase: HandleBoardUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getBoards(
    @Query('pageSize') pageSize: number,
    @Query('pageNum') pageNum: number,
  ) {
    const command = new GetBoardsCommand(pageSize, pageNum);
    return ResponseEntity.OK_WITH(
      await this._getBoardsUseCase.getBoards(command),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getBoard(@Param('id', ParseIntPipe) id: number) {
    return ResponseEntity.OK_WITH(await this._getBoardsUseCase.getBoard(id));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User, Role.Me)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createBoard(@Body() dto: CreateBoardReq) {
    return ResponseEntity.CREATED_WITH(
      await this._handleBoardUseCase.createBoard(dto),
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Me)
  @HttpCode(HttpStatus.CREATED)
  @Patch(':id')
  async updateBoard(
    @Param('id', ParseIntPipe) id: BoardId,
    @Body(UpdateBoardValidationPipe) dto: UpdateBoardBodyReq,
  ) {
    return ResponseEntity.OK_WITH(
      await this._handleBoardUseCase.updateBoard(id, dto),
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Me)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteBoard(@Param('id', ParseIntPipe) id: BoardId) {
    return ResponseEntity.OK_WITH(
      await this._handleBoardUseCase.deleteBoard(id),
    );
  }
}
