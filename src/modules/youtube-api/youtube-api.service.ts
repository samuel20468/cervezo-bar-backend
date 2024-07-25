import { Injectable } from '@nestjs/common';
import { CreateYoutubeApiDto } from './dto/create-youtube-api.dto';
import { UpdateYoutubeApiDto } from './dto/update-youtube-api.dto';

@Injectable()
export class YoutubeApiService {
  create(createYoutubeApiDto: CreateYoutubeApiDto) {
    return 'This action adds a new youtubeApi';
  }

  findAll() {
    return `This action returns all youtubeApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} youtubeApi`;
  }

  update(id: number, updateYoutubeApiDto: UpdateYoutubeApiDto) {
    return `This action updates a #${id} youtubeApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} youtubeApi`;
  }
}
