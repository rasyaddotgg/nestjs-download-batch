import { Injectable } from '@nestjs/common';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DownloadDto } from './dtos/download.dto';
import { ExceljsService } from './exceljs.service';
import { ExceljsDto } from './dtos/exceljs.dto';
import * as crypto from 'crypto';

@Injectable()
export class AppService {
  MAX_LIMIT = 1000;

  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly exceljsService: ExceljsService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async countDownload(body) {
    const total = (await this.getData(body, true)) as number;
    return {
      total,
      limit: this.MAX_LIMIT,
    };
  }

  async progressDownload(body: DownloadDto) {
    const data = (await this.getData(body)) as Employee[];

    const dto: ExceljsDto = {
      data,
      headers: [
        'Employee Id',
        'Create DTM',
        'Person Id',
        'Created By',
        'Code',
        'Type id',
        'Status Id',
        'Alt Code',
        'Ref Code',
        'Ref Alt Code',
        'code_alternatif',
      ],
      page: body.page,
      fileName: `${crypto
        .createHash('md5')
        .update(new Date().toDateString())
        .digest('hex')}.xlsx`,
    };
    const file_name = await this.exceljsService.downloadExcel(dto);
    return { file_name };
  }

  async getData(dto: DownloadDto, isCount = false) {
    const builder = this.employeeRepository.createQueryBuilder().select();

    if (!isCount) {
      builder.take(this.MAX_LIMIT);
    }

    if (dto.page) {
      builder.skip((dto.page - 1) * this.MAX_LIMIT);
    }

    let data: number | Employee[];

    if (isCount) {
      data = await builder.getCount();
    } else {
      data = await builder.getMany();
    }

    // console.log(builder.getQueryAndParameters());

    return data;
  }
}
