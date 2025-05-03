import {
  IsString,
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Artist } from 'src/artists/artist.entity';

export class UpdateSongDTO {
  @IsString()
  @IsOptional()
  readonly title: string;

  @IsNumber({}, { each: true })
  @IsArray()
  @IsOptional()
  readonly artists: Artist[];

  @IsDateString()
  @IsOptional()
  readonly releasedDate: Date;

  @IsMilitaryTime()
  @IsOptional()
  readonly duration: Date;

  @IsString()
  @IsOptional()
  readonly lyrics: string;
}
