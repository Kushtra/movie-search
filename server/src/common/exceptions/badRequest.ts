import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequest extends HttpException {
  constructor(msg?: string) {
    const message = msg || 'Bad request, query/param/body invalid';
    super(message, HttpStatus.BAD_REQUEST);
  }
}
