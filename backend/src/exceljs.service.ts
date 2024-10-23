import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Workbook, Worksheet } from 'exceljs';
import * as fs from 'node:fs';
import { ExceljsDto } from './dtos/exceljs.dto';
import * as os from 'os';

@Injectable()
export class ExceljsService {
  async downloadExcel(payload: ExceljsDto): Promise<string> {
    const {
      data,
      sheetName,
      isNeedRowNumber = true,
      isAddFilterAll = false,
      isBorderAll = true,
      page,
      fileName,
    } = payload;

    let headers = payload.headers;

    if (!data) {
      throw new NotFoundException('No data to download.');
    }

    const rows = [];

    if (page === 1) {
      if (isNeedRowNumber) {
        headers = ['No', ...headers];
      }
      // add header
      rows.unshift(headers);
    }

    data.forEach((row, index) => {
      rows.push([index + 1, ...Object.values(row)]);
    });

    // https://tutorialspots.com/exceljs-how-to-get-active-sheet-6794.html
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(sheetName);

    if (page !== 1) {
      workbook = await workbook.xlsx.readFile(`${os.tmpdir()}\\${fileName}`);
      worksheet = workbook.getWorksheet(sheetName);
    }

    // set data
    worksheet.addRows(rows);

    if (isAddFilterAll) {
      this.addFilterRow(worksheet, headers.length);
    }

    if (isBorderAll) {
      this.addBorderAll(worksheet, headers.length, data.length);
    }

    try {
      const createdFileName = await this.saveFile(workbook, fileName);
      return createdFileName;
    } catch (error) {
      console.log(error);
    }

    // const createdFile = await new Promise<string>((resolve) => {
    //   tmp.file(
    //     {
    //       discardDescriptor: true,
    //       prefix,
    //       postfix: '.xlsx',
    //       mode: parseInt('0600', 8),
    //     },
    //     async (err, file) => {
    //       if (err) {
    //         throw new BadRequestException(err);
    //       }

    //       // Writing the temporary file
    //       workbook.xlsx
    //         .writeFile(file)
    //         // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //         .then((_) => {
    //           resolve(file);
    //         })
    //         .catch((err) => {
    //           throw new BadRequestException(err);
    //         });
    //     },
    //   );
    // });
    // Returning the path of file
    // return 'filename3.xlsx';
  }

  private addFilterRow(worksheet: Worksheet, columCount: number) {
    worksheet.autoFilter = {
      from: {
        row: 1,
        column: 2,
      },
      to: {
        row: 1,
        column: columCount + 1,
      },
    };
  }

  private addBorderAll(
    worksheet: Worksheet,
    columCount: number,
    rowCount: number,
  ) {
    for (let row = 1; row <= rowCount + 1; row++) {
      for (let col = 1; col <= columCount; col++) {
        const cell = worksheet.getCell(row, col);
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      }
    }
  }

  // async saveFile(workbook: Workbook, fileName?: string) {
  //   const createdFile = await new Promise<string>((resolve) => {
  //     tmp.file(
  //       {
  //         detachDescriptor: true,
  //         postfix: '.xlsx',
  //         name: 'bisaa-dong.xlsx',
  //         mode: parseInt('0600', 8),
  //       },
  //       async (err, file) => {
  //         if (err) {
  //           throw new BadRequestException(err);
  //         }

  //         try {
  //           await workbook.xlsx.writeFile(file);
  //           resolve(file);
  //         } catch (error) {
  //           throw new BadRequestException(error);
  //         }
  //       },
  //     );
  //   });

  //   return createdFile;
  // }

  async saveFile(workbook: Workbook, fileName: string) {
    // const tempFilename = `${os.tmpdir()}\\${fileName}`;

    const createdFileName = await new Promise<string>((resolve, reject) => {
      // if (!fs.existsSync(tempFilename)) {
      //   const createStream = fs.createWriteStream(tempFilename);
      //   createStream.end();
      // }
      if (!fs.existsSync(fileName)) {
        const createStream = fs.createWriteStream(fileName);
        createStream.end();
      }
      // "C:\\Users\\mchmd\\AppData\\Local\\Temp\\CPM Report-193272-xN96E7rPGZVm-.xlsx"

      // workbook.xlsx
      //   .writeFile(tempFilename)
      //   .then((_) => {
      //     resolve(tempFilename);
      //   })
      //   .catch((err) => reject(err));
      workbook.xlsx
        .writeFile(fileName)
        .then((_) => {
          resolve(fileName);
        })
        .catch((err) => reject(err));
    });

    return createdFileName;
    // const uniqueFileName = `${fileName}${new Date().getTime()}.xlsx`;
    // const createdFile = await new Promise<string>((resolve) => {
    //   tmp.file(
    //     {
    //       detachDescriptor: true,
    //       name: fileName,
    //       mode: parseInt('0600', 8),
    //     },
    //     async (err, file) => {
    //       if (err) {
    //         throw new BadRequestException(err);
    //       }
    //       try {
    //         await workbook.xlsx.writeFile(file);
    //         resolve(file);
    //       } catch (error) {
    //         throw new BadRequestException(error);
    //       }
    //     },
    //   );
    // });
    // return createdFile;
  }

  getWorkbookForUploadFormat(headers: string[]) {
    const workbook: Workbook = new Workbook();
    const worksheet: Worksheet = workbook.addWorksheet('Upload Format');
    worksheet.addRow(headers);
    return workbook;
  }
}
