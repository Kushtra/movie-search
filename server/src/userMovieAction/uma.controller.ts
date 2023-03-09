import { BadRequestException, Body, Controller, Param, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GuardedRequest } from 'src/common/interfaces';
import { ParamNumValidator } from 'src/common/validators';
import { UmaService } from './uma.service';
import {
  RatingDto,
  RatingValidator,
  ReviewDto,
  ReviewValidator,
  WatchedDto,
  WatchedValidator,
  WatchLaterDto,
  WatchLaterValidator
} from './uma.validator';

@Controller('uma')
export class UmaController {
  constructor(private readonly umaService: UmaService) {}

  @UseGuards(JwtAuthGuard)
  @Put(':movieId/review')
  async updateReview(@Req() req: GuardedRequest, @Param('movieId') movieId: number, @Body() reviewDto: ReviewDto) {
    const validatedId = await ParamNumValidator.parseAsync(+movieId).catch(() => {
      throw new BadRequestException();
    });
    const { review } = await ReviewValidator.parseAsync(reviewDto).catch(() => {
      throw new BadRequestException();
    });
    const uma = await this.umaService.fetchOrCreate(req.user.id, validatedId);
    uma.review = review;
    await this.umaService.update(uma);
    return uma;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':movieId/rating')
  async updateRating(@Req() req: GuardedRequest, @Param('movieId') movieId: number, @Body() ratingDto: RatingDto) {
    const validatedId = await ParamNumValidator.parseAsync(+movieId).catch(() => {
      throw new BadRequestException();
    });
    const { rating } = await RatingValidator.parseAsync(ratingDto).catch(() => {
      throw new BadRequestException();
    });
    const uma = await this.umaService.fetchOrCreate(req.user.id, validatedId);
    uma.rating = rating;
    await this.umaService.update(uma);
    return uma;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':movieId/watchLater')
  async updateWatchLater(@Req() req: GuardedRequest, @Param('movieId') movieId: number, @Body() watchLaterDto: WatchLaterDto) {
    const validatedId = await ParamNumValidator.parseAsync(+movieId).catch(() => {
      throw new BadRequestException();
    });
    const { watchLater } = await WatchLaterValidator.parseAsync(watchLaterDto).catch(() => {
      throw new BadRequestException();
    });
    const uma = await this.umaService.fetchOrCreate(req.user.id, validatedId);
    uma.watchLater = watchLater;
    await this.umaService.update(uma);
    return uma;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':movieId/watched')
  async updateWatched(@Req() req: GuardedRequest, @Param('movieId') movieId: number, @Body() watchedDto: WatchedDto) {
    const validatedId = await ParamNumValidator.parseAsync(+movieId).catch(() => {
      throw new BadRequestException();
    });
    const { watched } = await WatchedValidator.parseAsync(watchedDto).catch(() => {
      throw new BadRequestException();
    });
    const uma = await this.umaService.fetchOrCreate(req.user.id, validatedId);
    uma.watched = watched;
    await this.umaService.update(uma);
    return uma;
  }
}
