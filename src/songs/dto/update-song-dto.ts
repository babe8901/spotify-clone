import {
  IsString,
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsOptional,
} from 'class-validator';

export class UpdateSongDTO {
  @IsString()
  @IsOptional()
  readonly title: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  readonly artists: string[];

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
