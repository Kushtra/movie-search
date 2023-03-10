import { Body, Controller, Param, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { GuardedRequest } from '@/common/interfaces';
import { UserMovieAction } from '@/userMovieAction/uma.entity';
import { UmaService } from '@/userMovieAction/uma.service';
import { RatingDto, ReviewDto, WatchedDto, WatchLaterDto } from '@/userMovieAction/uma.validator';

@Controller('uma')
export class UmaController {
  constructor(private readonly umaService: UmaService) {}

  @UseGuards(JwtAuthGuard)
  @Put(':movieId/review')
  async updateReview(
    @Req() req: GuardedRequest,
    @Param('movieId') movieId: number,
    @Body() reviewDto: ReviewDto
  ): Promise<UserMovieAction> {
    const uma = await this.umaService.fetchOrCreate(req.user.id, movieId);
    uma.review = reviewDto.review;
    await this.umaService.update(uma);
    return uma;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':movieId/rating')
  async updateRating(
    @Req() req: GuardedRequest,
    @Param('movieId') movieId: number,
    @Body() ratingDto: RatingDto
  ): Promise<UserMovieAction> {
    const uma = await this.umaService.fetchOrCreate(req.user.id, movieId);
    uma.rating = ratingDto.rating;
    await this.umaService.update(uma);
    return uma;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':movieId/watchLater')
  async updateWatchLater(
    @Req() req: GuardedRequest,
    @Param('movieId') movieId: number,
    @Body() watchLaterDto: WatchLaterDto
  ): Promise<UserMovieAction> {
    const uma = await this.umaService.fetchOrCreate(req.user.id, movieId);
    uma.watchLater = watchLaterDto.watchLater;
    await this.umaService.update(uma);
    return uma;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':movieId/watched')
  async updateWatched(
    @Req() req: GuardedRequest,
    @Param('movieId') movieId: number,
    @Body() watchedDto: WatchedDto
  ): Promise<UserMovieAction> {
    const uma = await this.umaService.fetchOrCreate(req.user.id, movieId);
    uma.watched = watchedDto.watched;
    await this.umaService.update(uma);
    return uma;
  }
}
