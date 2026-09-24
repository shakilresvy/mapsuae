import { rawDataFromPdf } from './pdfRawData';

export interface TopSalesPart {
  p: string;
  d: string;
  c?: string;
}

export const TOP_SALES_PART_LIST: TopSalesPart[] = rawDataFromPdf;
