import { globalConfig } from './common/config/global-config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './common/config/orm-config';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    ConfigModule.forRoot(globalConfig),
    TypeOrmModule.forRoot(typeOrmConfig),
    BoardModule,
  ],
})
export class AppModule {}
