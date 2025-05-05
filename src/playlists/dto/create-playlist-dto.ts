import { PickType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { Playlist } from '../playlist.entity';

export class CreatePlayListDTO extends PickType(Playlist, [
  'name',
  'songs',
  'user',
]) {
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
