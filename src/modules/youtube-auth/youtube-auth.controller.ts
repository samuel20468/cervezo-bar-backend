import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { YoutubeAuthService } from './youtube-auth.service';

@Controller('youtube-auth')
export class YoutubeAuthController {
  constructor(private readonly youtubeService: YoutubeAuthService) {}

  @Get('login')
  @Redirect()
  async login() {
    const url = this.youtubeService.getAuthUrl();
    
    return { url };
  }

  @Get('callback')
  async callback(@Query('code') code: string) {
    const tokens = await this.youtubeService.getTokens(code);
    
    return { tokens };
  }
}
