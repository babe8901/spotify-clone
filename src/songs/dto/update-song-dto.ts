import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly title?: string;

  @ApiProperty({ required: false })
  @IsNumber({}, { each: true })
  @IsArray()
  @IsOptional()
  readonly artists?: Artist[];

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  readonly releasedDate?: Date;

  @ApiProperty({ required: false })
  @IsMilitaryTime()
  @IsOptional()
  readonly duration?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly lyrics?: string;
}
