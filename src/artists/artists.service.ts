import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  findArtist(userId: number): Promise<Artist | null> {
    return this.artistRepository.findOneBy({ user: { id: userId } });
  }
}
