import { MaterializedView } from './materialized-view.type';

export interface CassandraModelConfig {
  modelToken?: string;
  keyspace?: string;
  table: string;
  materializedViews?: MaterializedView[];
}
