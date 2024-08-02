//Nest importations
import { Injectable } from '@nestjs/common';

//Depedencies importations
import axios from 'axios';
import * as fs from 'fs';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

//Application variables importations
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
} from 'src/utils/constants';

//Application helpers
import { decrypt, encrypt } from 'src/helpers/encrypt-decryptToken';
import { IYoutubeTokens } from 'src/utils/types';

@Injectable()
export class YoutubeAuthService {
  private oauth2Client: OAuth2Client;
  private configFile: string = './src/config/config.json';

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI,
    );
  }

  getConfig(): IYoutubeTokens {
    const encryptedData = fs.readFileSync(this.configFile, 'utf8');
    const data = decrypt(encryptedData);
    return JSON.parse(data);
  }

  updateConfig(newAccessToken: string, newRefreshToken: string) {
    const config = this.getConfig();
    config.youtube.access_token = newAccessToken;
    config.youtube.refresh_token = newRefreshToken;
    const data = JSON.stringify(config, null, 2);
    const encryptedData = encrypt(data);
    fs.writeFileSync(this.configFile, encryptedData, 'utf8');
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

  async refreshAcessToken() {
    const config = this.getConfig();
    const REFRESH_TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';

    try {
      const response = await axios.post(REFRESH_TOKEN_ENDPOINT, {
        grant_type: 'refresh_token',
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        refresh_token: config.youtube.refresh_token,
      });

      const { access_token, refresh_token } = response.data;

      this.updateConfig(access_token, refresh_token);
    } catch (error) {
      throw Error(error.message);
    }
  }
}
