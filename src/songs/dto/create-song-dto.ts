import { PickType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Artist } from 'src/artists/artist.entity';
import { Song } from '../song.entity';

export class CreateSongDTO extends PickType(Song, [
  'title',
  'artists',
  'releasedDate',
  'duration',
  'lyrics',
]) {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber({}, { each: true })
  @IsArray()
  @IsNotEmpty()
  readonly artists: Artist[];

  @IsDateString()
  @IsNotEmpty()
  readonly releasedDate: Date;

  @IsMilitaryTime()
  @IsNotEmpty()
  readonly duration: Date;

  @IsString()
  @IsOptional()
  readonly lyrics: string;
}
