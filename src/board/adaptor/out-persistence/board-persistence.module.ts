import { BoardService } from '../../application/board.service';
import { GetBoardsUseCaseSymbol } from '../../application/port/in/get-boards.use-case';
import { Global, Module } from '@nestjs/common';
import { BoardPersistenceAdaptor } from './board-persistence.adaptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardOrmEntity } from './board.orm-entity';
import { HandleBoardUseCaseSymbol } from 'src/board/application/port/in/handle-board.use-case';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([BoardOrmEntity])],
  providers: [
    BoardPersistenceAdaptor,
    {
      provide: GetBoardsUseCaseSymbol,
      useFactory: (boardPersistenceAdaptor) => {
        return new BoardService(
          boardPersistenceAdaptor,
          boardPersistenceAdaptor,
          boardPersistenceAdaptor,
        );
      },
      inject: [BoardPersistenceAdaptor],
    },
    {
      provide: HandleBoardUseCaseSymbol,
      useFactory: (boardPersistenceAdaptor) => {
        return new BoardService(
          boardPersistenceAdaptor,
          boardPersistenceAdaptor,
          boardPersistenceAdaptor,
        );
      },
      inject: [BoardPersistenceAdaptor],
    },
  ],
  exports: [GetBoardsUseCaseSymbol, HandleBoardUseCaseSymbol],
})
export class BoardPersistenceModule {}
