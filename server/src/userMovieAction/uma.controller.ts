import { BadRequestException, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GuardedRequest } from 'src/common/interfaces';
import { MovieService } from 'src/movie/movie.service';
import { UserService } from 'src/user/user.service';
import { UserMovieAction } from './uma.entity';
import { UmaService } from './uma.service';
import { CreateUmaDto, CreateUmaValidator } from './uma.validator';

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
}
