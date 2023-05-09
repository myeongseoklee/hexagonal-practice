import { Module } from '@nestjs/common';
import { InWebModule } from './adaptor/in-web/in-web.module';
import { BoardPersistenceModule } from './adaptor/out-persistence/board-persistence.module';

@Module({
  imports: [InWebModule, BoardPersistenceModule],
})
export class BoardModule {}
