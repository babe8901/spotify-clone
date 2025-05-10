import { Test, TestingModule } from '@nestjs/testing';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDTO } from './dto/update-song-dto';
import { Artist } from 'src/artists/artist.entity';

describe('SongsController', () => {
  let controller: SongsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongsController],
      providers: [
        {
          provide: SongsService,
          useValue: {
            findAll: jest
              .fn()
              .mockResolvedValue([{ id: 1, title: 'Dancing Feat' }]),
            findOne: jest.fn().mockImplementation((id: string) => {
              return Promise.resolve({ id, title: 'Dancing' });
            }),
            create: jest
              .fn()
              .mockImplementation((createSongDTO: CreateSongDTO) => {
                return Promise.resolve({ id: 1, ...createSongDTO });
              }),
            update: jest.fn().mockImplementation(() => {
              return Promise.resolve({ affected: 1 });
            }),
            remove: jest.fn().mockImplementation(() => {
              return Promise.resolve({ affected: 1 });
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<SongsController>(SongsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should fetch all the songs', async () => {
      const songs = await controller.findAll();
      expect(songs).toEqual([{ id: 1, title: 'Dancing Feat' }]);
    });
  });

  describe('findOne', () => {
    it('should give me the song by id', async () => {
      const song = await controller.findOne(1);
      expect(song?.id).toBe(1);
    });
  });

  describe('createSong', () => {
    it('should create a new song', async () => {
      const newSongDTO: CreateSongDTO = {
        title: 'Runaway',
        releasedDate: new Date('2025-05-10'),
        duration: new Date('3:45'),
        artists: [new Artist()],
      };
      const song = await controller.create(newSongDTO);
      expect(song.title).toBe('Runaway');
      expect(song).toEqual({ id: 1, ...newSongDTO });
    });
  });

  describe('updateSong', () => {
    it('should update the song DTO', async () => {
      const updatesongDTO: UpdateSongDTO = {
        title: 'Animals',
      };
      const updateResults = await controller.update(1, updatesongDTO);
      expect(updateResults).toBeDefined();
      expect(updateResults.affected).toBe(1);
    });
  });

  describe('deleteSong', () => {
    it('should delete the song', async () => {
      const deleteResult = await controller.delete(1);
      expect(deleteResult.affected).toBe(1);
    });
  });
});
