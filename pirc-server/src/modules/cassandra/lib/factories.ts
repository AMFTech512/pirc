import { CassandraClient } from '../types/cassandra-client';
import { CassandraInitConfig } from '../types/init-config.type';
import { Repository } from './repository';

export function cassandraConnectionFactory(
  config: CassandraInitConfig,
): CassandraClient {
  console.log('Initializing cassandra connection:', config);
  return {
    createRepository(model: ObjectConstructor) {
      console.log('creating repository for', model.name);
      return new Repository(model.name);
    },
  };
}

export function cassandraRepositoryFactory(
  client: CassandraClient,
  model: ObjectConstructor,
) {
  return client.createRepository(model);
}
