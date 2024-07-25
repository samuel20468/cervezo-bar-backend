import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { YoutubeApiService } from './youtube-api.service';
import { CreateYoutubeApiDto } from './dto/create-youtube-api.dto';
import { UpdateYoutubeApiDto } from './dto/update-youtube-api.dto';

@Controller('youtube-api')
export class YoutubeApiController {
  constructor(private readonly youtubeApiService: YoutubeApiService) {}

  @Post()
  create(@Body() createYoutubeApiDto: CreateYoutubeApiDto) {
    return this.youtubeApiService.create(createYoutubeApiDto);
  }

  @Get()
  findAll() {
    return this.youtubeApiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.youtubeApiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateYoutubeApiDto: UpdateYoutubeApiDto) {
    return this.youtubeApiService.update(+id, updateYoutubeApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.youtubeApiService.remove(+id);
  }
}
