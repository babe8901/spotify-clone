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
    // Error comes while fetching the data from db
    throw new Error('Error in db while fetching record');
    return this.songs;
  }
}
