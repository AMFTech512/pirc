import { ColumnConfig } from '../types/column-config.type';
import { DataType } from '../types/data.type';

type ColumnData = {
  parentClass: ObjectConstructor;
  propertyKey: string;
  config: string | ColumnConfig;
};

export const DetectedColumns: ColumnData[] = [];

export const Column =
  (config: DataType | ColumnConfig) => (target: any, propertyKey: string) => {
    DetectedColumns.push({
      parentClass: target.constructor,
      propertyKey,
      config,
    });
  };
