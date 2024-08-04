// Nest importations
import { Injectable } from '@nestjs/common';

// Dependencies importations
import axios from 'axios';
import * as fs from 'fs';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

// Application variables importations
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
} from 'src/utils/constants';

// Application helpers
import { decrypt, encrypt } from 'src/helpers/encrypt-decryptToken';
import { IYoutubeTokens } from 'src/utils/types';

@Injectable()
export class YoutubeAuthService {
  private oauth2Client: OAuth2Client;
  private configFile: string = './src/config/config.enc';

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI,
    );
  }

  getConfig(): IYoutubeTokens {
    try {
      const encryptedData = fs.readFileSync(this.configFile, 'utf8');

      const data = decrypt(encryptedData);

      console.log(data);
      if (!data) {
        throw new Error('Decrypted data is undefined');
      }

      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Failed to read config: ${error.message}`);
    }
  }

  saveConfig(accessToken: string, refreshToken: string) {
    try {
      const config = {
        youtube: {
          acccess_token: accessToken,
          refresh_token: refreshToken,
        },
      };
      const data = JSON.stringify(config, null, 2);
      const encryptedData = encrypt(data);
      fs.writeFileSync(this.configFile, encryptedData, 'utf8');
    } catch (error) {
      throw new Error(`Failed to save config: ${error.message}`);
    }
  }

  updateConfig(newAccessToken: string) {
    try {
      const config = this.getConfig();
      config.youtube.access_token = newAccessToken;
      const data = JSON.stringify(config, null, 2);
      const encryptedData = encrypt(data);
      fs.writeFileSync(this.configFile, encryptedData, 'utf8');
    } catch (error) {
      throw new Error(`Failed to update config: ${error.message}`);
    }
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
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      this.oauth2Client.setCredentials(tokens);
      console.log(tokens);

      this.saveConfig(tokens.access_token, tokens.refresh_token);
      return tokens;
    } catch (error) {
      throw new Error(`Failed to save tokens: ${error.message}`);
    }
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

      const { access_token } = response.data;

      this.updateConfig(access_token);

      return response.data;
    } catch (error) {
      throw new Error(`Failed to refresh access token: ${error.message}`);
    }
  }
}
