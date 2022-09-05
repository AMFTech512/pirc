import { Repository } from '../lib/repository';

export interface CassandraClient {
  createRepository: (model: ObjectConstructor) => Repository<any>;
}
