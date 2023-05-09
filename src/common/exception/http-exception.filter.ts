import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';
import { CustomValidationError } from './custom-validation-error';
import { instanceToPlain } from 'class-transformer';
import { ResponseEntity } from '../res/response.entity';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;
    const responseBody = exception.getResponse() as any;

    const exceptionCheckOptions = {
      message,
      status,
      responseBody,
    };

    const responseEntity = this.exceptionChecker(exceptionCheckOptions);

    response.status(status).json(instanceToPlain(responseEntity));
  }

  toCustomValidationErrorByNest(
    responseBody: ValidationError,
  ): CustomValidationError {
    return new CustomValidationError(responseBody);
  }

  exceptionChecker({ status, message, responseBody }) {
    let responseEntity: ResponseEntity<string | object>;

    switch (status) {
      case 400:
        const isValidationError = responseBody instanceof ValidationError;

        responseEntity = ResponseEntity.ERROR_WITH_DATA<
          CustomValidationError[]
        >(
          message,
          HttpStatus.BAD_REQUEST,
          isValidationError
            ? [this.toCustomValidationErrorByNest(responseBody)]
            : (responseBody.message as CustomValidationError[]),
        );
        break;

      case 401:
        responseEntity = ResponseEntity.ERROR_WITH(
          message,
          HttpStatus.UNAUTHORIZED,
        );
        break;

      case 404:
        responseEntity = ResponseEntity.ERROR_WITH(
          message,
          HttpStatus.NOT_FOUND,
        );
        break;

      case 500:
        responseEntity = ResponseEntity.ERROR();
        break;

      default:
        responseEntity = ResponseEntity.ERROR_WITH(message, status);
        break;
    }

    return responseEntity;
  }
}
