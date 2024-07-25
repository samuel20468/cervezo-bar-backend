import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { config as dotenvConfig } from 'dotenv';
import { AuthModule } from './modules/auth/auth.module';
import { YoutubeApiModule } from './modules/youtube-api/youtube-api.module';
import { YoutubeAuthModule } from './modules/youtube-auth/youtube-auth.module';

dotenvConfig({ path: './.env.development' });

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    AuthModule,
    YoutubeApiModule,
    YoutubeAuthModule,
  ],
})
export class AppModule {}
