import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { DownloadDto } from './dtos/download.dto';
import { createReadStream } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('count-download')
  countDownload(@Body() body: DownloadDto) {
    return this.appService.countDownload(body);
  }

  @Post('progress-download')
  progressDownload(@Body() body: DownloadDto) {
    return this.appService.progressDownload(body);
  }

  @Get('download')
  @Header('Content-Disposition', 'attachment; filename="data.xlsx"')
  download(@Query('file_name') file_name: string) {
    const file = createReadStream(file_name);
    return new StreamableFile(file);
  }

  @Get('download-format')
  downloadFormat(@Query() body: DownloadDto) {
    return this.appService.downloadFormat(body);
  }

  @Get('create-sheet-upload-format')
  createSheetUploadFormat() {
    return this.appService.uploadFormat();
  }

  @Get('create-sheet-master-data-one')
  createSheetMasterDataOne(@Query() body: DownloadDto) {
    return this.appService.createSheetOne(body);
  }

  @Get('create-sheet-master-data-two')
  createSheetMasterDataTwo(@Query() body: DownloadDto) {
    return this.appService.createSheetTwo(body);
  }
}
