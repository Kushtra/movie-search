import { IsBoolean, IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class WatchLaterDto {
  @IsBoolean()
  watchLater!: boolean;
}

export class WatchedDto {
  @IsBoolean()
  watched!: boolean;
}

export class RatingDto {
  @IsInt()
  @Min(1)
  @Max(10)
  rating!: number;
}

export class ReviewDto {
  @IsString()
  @IsNotEmpty()
  review!: string;
}
