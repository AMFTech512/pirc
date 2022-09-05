import { CassandraModelConfig } from '../types/model-config.type';

export const DetectedModels: [ObjectConstructor, CassandraModelConfig][] = [];

export const Model = (config: CassandraModelConfig) => {
  return (target: any) => {
    DetectedModels.push([target, config]);
  };
};
