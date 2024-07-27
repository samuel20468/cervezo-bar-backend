import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { YoutubeApiService } from './youtube-api.service';
import { CreateYoutubeApiDto } from './dto/create-youtube-api.dto';
import { UpdateYoutubeApiDto } from './dto/update-youtube-api.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { ROLE } from 'src/utils/constants';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('youtube-api')
export class YoutubeApiController {
  constructor(private readonly youtubeApiService: YoutubeApiService) {}

  @Post()
  create(@Body() createYoutubeApiDto: CreateYoutubeApiDto) {
    return this.youtubeApiService.create(createYoutubeApiDto);
  }

  @Get()
  @Roles(ROLE.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  findAll(@Req() req: any) {
    this.youtubeApiService.findAll();
    return req.user;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.youtubeApiService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateYoutubeApiDto: UpdateYoutubeApiDto,
  ) {
    return this.youtubeApiService.update(+id, updateYoutubeApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.youtubeApiService.remove(+id);
  }
}
