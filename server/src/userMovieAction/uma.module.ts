import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UmaController } from './uma.controller';
import { UserMovieAction } from './uma.entity';
import { UmaService } from './uma.service';

@Module({
  imports: [MikroOrmModule.forFeature([UserMovieAction])],
  controllers: [UmaController],
  providers: [UmaService]
})
export class UmaModule {}
