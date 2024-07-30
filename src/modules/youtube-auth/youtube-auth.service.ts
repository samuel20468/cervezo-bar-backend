import { Injectable } from '@nestjs/common';
import { CreateYoutubeAuthDto } from './dto/create-youtube-auth.dto';
import { UpdateYoutubeAuthDto } from './dto/update-youtube-auth.dto';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
} from 'src/utils/constants';

@Injectable()
export class YoutubeAuthService {
  private oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI,
    );
  }

  getAuthUrl() {
    const scopes = [
      'https://www.googleapis.com/auth/youtube',
      'https://www.googleapis.com/auth/youtube.force-ssl',
      'https://www.googleapis.com/auth/youtubepartner',
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
  }

  async getTokens(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);
    return tokens;
  }

  async getAuthenticatedClient() {
    return this.oauth2Client;
  }
}
