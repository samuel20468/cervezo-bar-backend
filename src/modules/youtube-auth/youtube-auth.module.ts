import { Module } from '@nestjs/common';
import { YoutubeAuthService } from './youtube-auth.service';
import { YoutubeAuthController } from './youtube-auth.controller';

@Module({
  providers: [YoutubeAuthService],
  controllers: [YoutubeAuthController],
})
export class YoutubeAuthModule {}
