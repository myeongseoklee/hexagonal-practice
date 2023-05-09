import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateBoardBodyReq } from '../dto/update-board-body-req.dto';

@Injectable()
export class UpdateBoardValidationPipe implements PipeTransform {
  async transform(value: any) {
    const updateBoardBodyDto = plainToInstance(UpdateBoardBodyReq, value);

    const errors = await validate(updateBoardBodyDto);

    if (
      errors.length > 0 ||
      (!updateBoardBodyDto.title && !updateBoardBodyDto.content)
    ) {
      throw new BadRequestException('요청 값에 문제가 있습니다.');
    }

    return updateBoardBodyDto;
  }
}
