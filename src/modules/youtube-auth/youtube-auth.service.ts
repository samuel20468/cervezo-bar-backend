import { Injectable } from '@nestjs/common';
import { CreateYoutubeAuthDto } from './dto/create-youtube-auth.dto';
import { UpdateYoutubeAuthDto } from './dto/update-youtube-auth.dto';

@Injectable()
export class YoutubeAuthService {
  create(createYoutubeAuthDto: CreateYoutubeAuthDto) {
    return 'This action adds a new youtubeAuth';
  }

  findAll() {
    return `This action returns all youtubeAuth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} youtubeAuth`;
  }

  update(id: number, updateYoutubeAuthDto: UpdateYoutubeAuthDto) {
    return `This action updates a #${id} youtubeAuth`;
  }

  remove(id: number) {
    return `This action removes a #${id} youtubeAuth`;
  }
}
