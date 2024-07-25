import { PartialType } from '@nestjs/mapped-types';
import { CreateYoutubeApiDto } from './create-youtube-api.dto';

export class UpdateYoutubeApiDto extends PartialType(CreateYoutubeApiDto) {}
