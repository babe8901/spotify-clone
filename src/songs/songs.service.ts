import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  // local array

  private readonly songs: string[] = [];

  create(song: string) {
    // save the song to db
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    // fetch all songs from db
    return this.songs;
  }
}
