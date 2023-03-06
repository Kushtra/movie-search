import { BadRequestException, Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GuardedRequest } from 'src/common/interfaces';
import { ParamNumValidator } from 'src/common/validators';
import { MovieService } from 'src/movie/movie.service';
import { UserService } from 'src/user/user.service';
import { UserMovieAction } from './uma.entity';
import { UmaService } from './uma.service';
import {
  CreateUmaDto,
  CreateUmaValidator,
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
  constructor(
    private readonly umaService: UmaService,
    private readonly userService: UserService,
    private readonly movieService: MovieService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: GuardedRequest, @Body() createUmaDto: CreateUmaDto): Promise<UserMovieAction> {
    const umaDto = await CreateUmaValidator.parseAsync(createUmaDto).catch(() => {
      throw new BadRequestException();
    });

    const user = await this.userService.fetchById(req.user.id);
    const movie = await this.movieService.fetchById(umaDto.movieId);
    const uma = new UserMovieAction({
      review: umaDto.review,
      rating: umaDto.rating,
      watched: umaDto.watched,
      watchLater: umaDto.watchLater,
      user,
      movie
    });
    uma.id = await this.umaService.create(uma);
    return uma;
  }

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
