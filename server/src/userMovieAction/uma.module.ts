import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { MovieModule } from 'src/movie/movie.module';
import { UserModule } from 'src/user/user.module';
import { UmaController } from './uma.controller';
import { UserMovieAction } from './uma.entity';
import { UmaService } from './uma.service';

@Module({
  imports: [MikroOrmModule.forFeature([UserMovieAction]), UserModule, MovieModule],
  controllers: [UmaController],
  providers: [UmaService]
})
export class UmaModule {}
