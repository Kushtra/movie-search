import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFound extends HttpException {
  constructor(msg?: string) {
    const message = msg || 'Not found';
    super(message, HttpStatus.NOT_FOUND);
  }
}
