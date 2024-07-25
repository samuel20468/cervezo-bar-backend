import { Module } from '@nestjs/common';
import { YoutubeApiService } from './youtube-api.service';
import { YoutubeApiController } from './youtube-api.controller';

@Module({
  controllers: [YoutubeApiController],
  providers: [YoutubeApiService],
})
export class YoutubeApiModule {}
