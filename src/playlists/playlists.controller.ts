import { Body, Controller, Post } from '@nestjs/common';
import { Playlist } from './playlist.entity';
import { PlayListsService } from './playlists.service';
import { CreatePlayListDTO } from './dto/create-playlist-dto';

@Controller('playlists')
export class PlayListsController {
  constructor(private playListService: PlayListsService) {}
  @Post()
  create(
    @Body()
    playlistDTO: CreatePlayListDTO,
  ): Promise<Playlist> {
    return this.playListService.create(playlistDTO);
  }
}
