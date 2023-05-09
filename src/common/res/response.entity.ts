import { HttpStatus } from '@nestjs/common';
import { Exclude, Expose } from 'class-transformer';

export class ResponseEntity<T> {
  @Exclude() private readonly _data: T;
  @Exclude() private readonly _message?: string;
  @Exclude() private readonly _code: number;

  private constructor(status: HttpStatus, data?: T, message?: string) {
    this._data = data;
    this._message = message;
    this._code = status;
  }

  static OK(): ResponseEntity<string> {
    return new ResponseEntity<string>(HttpStatus.OK, null);
  }

  static OK_WITH<T>(data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(HttpStatus.OK, data);
  }

  static CREATED_WITH<T>(data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(HttpStatus.CREATED, data);
  }

  static ERROR(): ResponseEntity<string> {
    return new ResponseEntity<string>(
      HttpStatus.INTERNAL_SERVER_ERROR,
      null,
      '서버 에러가 발생했습니다.',
    );
  }

  static ERROR_WITH(
    message: string,
    code: HttpStatus = HttpStatus.BAD_REQUEST,
  ): ResponseEntity<string> {
    return new ResponseEntity<string>(code, null, message);
  }

  static ERROR_WITH_DATA<T>(
    message: string,
    code: HttpStatus = HttpStatus.BAD_REQUEST,
    data: T,
  ): ResponseEntity<T> {
    return new ResponseEntity<T>(code, data, message);
  }

  @Expose()
  get message(): string {
    return this._message;
  }

  @Expose()
  get data(): T {
    return this._data;
  }

  @Expose()
  get code(): number {
    return this._code;
  }
}
