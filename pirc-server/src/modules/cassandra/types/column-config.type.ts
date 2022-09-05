import { DataType } from './data.type';

export interface ColumnConfig {
  type: DataType;
  default: () => any;
}
