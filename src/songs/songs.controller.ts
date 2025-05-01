import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Post()
  create() {
    return this.songsService.create('Animals by Martin Garrix');
  }

  @Get(':id')
  findOne() {
    return 'fetch song based on id';
  }

  @Put(':id')
  Update() {
    return 'update song based on id';
  }

  @Delete(':id')
  delete() {
    return 'delete song based on id';
  }
}
