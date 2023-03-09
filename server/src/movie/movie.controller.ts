import { Req, Get, Controller, UseGuards, Param } from '@nestjs/common';
import { OptionalGuard } from 'src/auth/guards/optional.guard';
import { PublicRequest } from 'src/common/interfaces';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @UseGuards(OptionalGuard)
  @Get()
  async findAll(@Req() req: PublicRequest): Promise<Movie[]> {
    // add pagination
    const movies = await this.movieService.fetchAll(20, 0, req.user?.id);
    return movies;
  }

  @UseGuards(OptionalGuard)
  @Get(':movieId')
  async findOne(@Req() req: PublicRequest, @Param('movieId') movieId: number): Promise<Movie> {
    const movie = await this.movieService.fetchById(movieId);
    return movie;
  }
}
