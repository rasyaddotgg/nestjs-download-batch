export class ExceljsDto {
  headers?: string[];
  sheetName?: string = 'sheet1';
  data: any[];
  isNeedRowNumber?: boolean;
  isAddFilterAll?: boolean;
  isBorderAll?: boolean;
  page?: number;
  fileName?: string;
}
