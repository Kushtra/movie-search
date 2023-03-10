import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UmaController } from '@/userMovieAction/uma.controller';
import { UserMovieAction } from '@/userMovieAction/uma.entity';
import { UmaService } from '@/userMovieAction/uma.service';

@Module({
  imports: [MikroOrmModule.forFeature([UserMovieAction])],
  controllers: [UmaController],
  providers: [UmaService]
})
export class UmaModule {}
