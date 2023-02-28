import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@Module({
  imports: [MikroOrmModule.forFeature([Movie])],
  providers: [MovieService],
  controllers: [MovieController]
})
export class MovieModule {}
