import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Repository } from 'typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { CreatePlayListDTO } from './dto/create-playlist-dto';

@Injectable()
export class PlayListsService {
  constructor(
    @InjectRepository(Playlist)
    private playListRepo: Repository<Playlist>,
    @InjectRepository(Song)
    private songsRepo: Repository<Song>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(playListDTO: CreatePlayListDTO): Promise<Playlist> {
    const playList = new Playlist();
    playList.name = playListDTO.name;
    // songs will be the array of IDs that we are getting from the DTO object
    const songs = await this.songsRepo.findByIds(playListDTO.songs);
    //Set the relation for the songs with the playlist entity
    playList.songs = songs;
    // A user will be the ID of the user we are getting from the request
    //When we implemented the user authentication this id will become the logged in user id
    const user = await this.userRepo.findOneBy({ id: playListDTO.user?.id });
    playList.user = user;
    return this.playListRepo.save(playList);
  }
}
