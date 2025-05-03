import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';

export class CreatePlayListDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber({}, { each: true })
  @IsArray()
  @IsNotEmpty()
  readonly songs: Song[];

  @IsNumber()
  @IsNotEmpty()
  readonly user: User | null;
}
