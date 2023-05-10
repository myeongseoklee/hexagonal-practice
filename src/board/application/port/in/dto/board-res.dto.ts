import { BoardEntity, BoardId } from '../../../../domain/board.entity';
import { Exclude, Expose } from 'class-transformer';

export class BoardRes {
  @Exclude() private readonly _id: BoardId;
  @Exclude() private readonly _title: string;
  @Exclude() private readonly _content: string;
  @Exclude() private readonly _createdAt: Date;
  @Exclude() private readonly _updatedAt: Date;

  constructor(board: BoardEntity) {
    this._id = board.id;
    this._title = board.title;
    this._content = board.content;
    this._createdAt = board.createdAt;
    this._updatedAt = board.updatedAt;
  }

  @Expose()
  get id() {
    return this._id;
  }

  @Expose()
  get title() {
    return this._title;
  }

  @Expose()
  get content() {
    return this._content;
  }

  @Expose()
  get createdAt() {
    return this._createdAt.toLocaleString();
  }

  @Expose()
  get updatedAt() {
    return this._updatedAt.toLocaleString();
  }
}
