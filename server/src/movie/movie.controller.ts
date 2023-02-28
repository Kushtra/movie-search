import { Get, Controller } from '@nestjs/common';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.movieService.fetchAll();
  }
}
