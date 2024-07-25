import { Module } from '@nestjs/common';
import { YoutubeAuthService } from './youtube-auth.service';

@Module({
  providers: [YoutubeAuthService],
})
export class YoutubeAuthModule {}
