import { Test, TestingModule } from '@nestjs/testing';
import { SongsService } from './songs.service';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { UpdateSongDTO } from './dto/update-song-dto';
import { CreateSongDTO } from './dto/create-song-dto';
import { Artist } from 'src/artists/artist.entity';
import { User } from 'src/users/user.entity';

describe('SongsService', () => {
  let service: SongsService;
  let repo: Repository<Song>;

  const oneArtist: Artist = { id: 1, user: new User(), songs: [new Song()] };

  const oneSong = new Song();
  oneSong.title = 'Lover';
  oneSong.releasedDate = new Date('2025-05-10');
  oneSong.duration = new Date('3:45');
  oneSong.artists = [oneArtist];

  const createSongDTO: CreateSongDTO = {
    title: 'Lover',
    releasedDate: new Date('2025-05-10'),
    duration: new Date('3:45'),
    artists: [new Artist()],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongsService,
        {
          provide: getRepositoryToken(Song),
          useValue: {
            find: jest
              .fn()
              .mockImplementation(() => Promise.resolve([oneSong])),
            findOneBy: jest
              .fn()
              .mockImplementation((options: FindOneOptions<Song>) => {
                return Promise.resolve(oneSong);
              }),
            create: jest
              .fn()
              .mockImplementation((createSongDTO: CreateSongDTO) => {
                return Promise.resolve(oneSong);
              }),
            save: jest
              .fn()
              .mockImplementation((createSongDTO: CreateSongDTO) => {
                return Promise.resolve({
                  ...oneSong,
                });
              }),
            update: jest
              .fn()
              .mockImplementation(
                (id: string, updateSongDTO: UpdateSongDTO) => {
                  return Promise.resolve({ affected: 1 });
                },
              ),
            delete: jest
              .fn()
              .mockImplementation((id: string) =>
                Promise.resolve({ affected: 1 }),
              ),
          },
        },
        {
          provide: getRepositoryToken(Artist),
          useValue: {
            findOneOrFail: jest
              .fn()
              .mockImplementation((options: FindOneOptions<Artist>) => {
                return Promise.resolve(oneArtist);
              }),
            findByIds: jest
              .fn()
              .mockImplementation((options: FindManyOptions<Artist>) => {
                return Promise.resolve([oneArtist]);
              }),
          },
        },
      ],
    }).compile();

    service = module.get<SongsService>(SongsService);
    repo = module.get<Repository<Song>>(getRepositoryToken(Song));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should give me the song by id', async () => {
    const song = await service.findOne(1);
    const repoSpy = jest.spyOn(repo, 'findOneBy');
    expect(song).toEqual(oneSong);

    console.log(repoSpy.mock.calls);

    expect(repoSpy).toBeCalledWith({ id: 1 });
  });

  it('should create the song', async () => {
    const song = await service.create(createSongDTO);
    expect(song).toEqual(oneSong);
    expect(repo.save).toBeCalledTimes(1);
  });

  it('should update the song', async () => {
    const result = await service.update(1, { title: 'Lover' });
    expect(repo.update).toBeCalledTimes(1);
    expect(result.affected).toEqual(1);
  });

  it('should delete the song', async () => {
    const song = await service.remove(1);
    const repoSpyOn = jest.spyOn(repo, 'delete');
    expect(repo.delete).toBeCalledTimes(1);
    expect(song.affected).toBe(1);
    expect(repoSpyOn).toBeCalledWith(1);
  });
});
