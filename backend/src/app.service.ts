import { Injectable } from '@nestjs/common';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { DownloadDto } from './dtos/download.dto';
import { ExceljsService } from './exceljs.service';
import { ExceljsDto } from './dtos/exceljs.dto';
import * as crypto from 'crypto';
import { Workbook } from 'exceljs';
import { OrgHasPosition } from './entities/organization-has-position.entity';

@Injectable()
export class AppService {
  MAX_LIMIT = 1000;

  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly exceljsService: ExceljsService,
    @InjectRepository(OrgHasPosition)
    private readonly ohpRepository: Repository<OrgHasPosition>,
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

  async downloadFormat(body: DownloadDto) {
    const totalEmp = await this.employeeRepository.count({
      where: {
        status_id: 1,
      },
    });

    const totalOhp = await this.ohpRepository.find({
      take: 10000,
    });

    return [
      {
        total: 1,
        name: 'Download Format',
        url: 'create-sheet-upload-format',
        limit: 1,
      },
      {
        total: totalEmp,
        name: 'Create sheet 1',
        url: 'create-sheet-master-data-one',
        limit: this.MAX_LIMIT,
      },
      {
        total: totalEmp,
        name: 'Create sheet 2',
        url: 'create-sheet-master-data-two',
        limit: this.MAX_LIMIT,
      },
    ];
  }

  async uploadFormat() {
    const headers = [
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
    ];

    const workbook = this.exceljsService.getWorkbookForUploadFormat(headers);
    return await this.exceljsService.saveFile(
      workbook,
      'temp/upload_format.xlsx',
    );
  }

  async createSheetOne(body: DownloadDto) {
    let workbook: Workbook = new Workbook();
    workbook = await workbook.xlsx.readFile('temp/upload_format.xlsx');
    let worksheet;

    if (Number(body.page) === 1) {
      worksheet = workbook.addWorksheet('Sheet 1');
    } else {
      worksheet = workbook.getWorksheet('Sheet 1');
    }

    console.log(body);

    const rows = await this.employeeRepository.find({
      take: this.MAX_LIMIT,
      skip: (body.page - 1) * this.MAX_LIMIT,
      where: {
        status_id: 1,
      },
    });

    worksheet.addRows(rows.map((row) => Object.values(row)));
    return await this.exceljsService.saveFile(
      workbook,
      'temp/upload_format.xlsx',
    );
  }

  async createSheetTwo(body: DownloadDto) {
    let workbook: Workbook = new Workbook();
    workbook = await workbook.xlsx.readFile('temp/upload_format.xlsx');
    let worksheet;

    if (Number(body.page) === 1) {
      worksheet = workbook.addWorksheet('Sheet 2');
    } else {
      worksheet = workbook.getWorksheet('Sheet 2');
    }

    const rows = await this.employeeRepository.find({
      take: this.MAX_LIMIT,
      skip: (body.page - 1) * this.MAX_LIMIT,
      where: {
        status_id: MoreThan(1),
      },
    });

    worksheet.addRows(rows.map((row) => Object.values(row)));
    return await this.exceljsService.saveFile(
      workbook,
      'temp/upload_format.xlsx',
    );
  }

  async createSheetTwoOhp(body: DownloadDto) {
    let workbook: Workbook = new Workbook();
    workbook = await workbook.xlsx.readFile('temp/upload_format.xlsx');
    let worksheet;

    if (Number(body.page) === 1) {
      worksheet = workbook.addWorksheet('Sheet 2');
    } else {
      worksheet = workbook.getWorksheet('Sheet 2');
    }

    const rows = await this.ohpRepository.find({
      take: this.MAX_LIMIT,
      skip: (body.page - 1) * this.MAX_LIMIT,
    });

    worksheet.addRows(
      rows.map((row) => [
        row.id,
        row.organization_id,
        row.position_id,
        row.position_name,
      ]),
    );
    return await this.exceljsService.saveFile(
      workbook,
      'temp/upload_format.xlsx',
    );
  }
}
