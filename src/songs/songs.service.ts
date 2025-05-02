import { Injectable } from '@nestjs/common';
import { CreateSongDTO } from './dto/create-song-dto';

@Injectable()
export class SongsService {
  // local array

  private readonly songs: CreateSongDTO[] = [];

  create(song: CreateSongDTO) {
    // save the song to db
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    // fetch all songs from db
    return this.songs;
  }
}
