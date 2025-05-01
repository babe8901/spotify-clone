import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('songs')
export class SongsController {
  @Get()
  findAll() {
    return 'find all songs endpoint';
  }

  @Post()
  create() {
    return 'create a new song endpoint';
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
