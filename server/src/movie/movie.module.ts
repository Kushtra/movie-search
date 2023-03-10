import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { MovieController } from '@/movie/movie.controller';
import { Movie } from '@/movie/movie.entity';
import { MovieService } from '@/movie/movie.service';

@Module({
  imports: [MikroOrmModule.forFeature([Movie])],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}
