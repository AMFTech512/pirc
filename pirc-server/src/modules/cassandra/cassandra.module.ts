import {
  DynamicModule,
  Global,
  Logger,
  Module,
  Provider,
} from '@nestjs/common';
import { DetectedModels } from './decorators/model.decorator';
import { CassandraInitConfig } from './types/init-config.type';
import { CassandraService } from './cassandra.service';
import {
  CASSANDRA_CLIENT_CONFIG_TOKEN,
  CASSANDRA_CLIENT_TOKEN,
} from './lib/constants';
import {
  cassandraConnectionFactory,
  cassandraRepositoryFactory,
} from './lib/factories';
import { CassandraClient } from './types/cassandra-client';

// we need this to be @Global so that any calls to CassandraModule.forFeature can access
// the cassandra client config object without importing CassandraModule.forRoot
@Global()
@Module({
  providers: [CassandraService],
})
export class CassandraModule {
  // private static _REPOSITORY_PROVIDERS: Provider[];

  static forRoot(config: CassandraInitConfig): DynamicModule {
    Logger.log('inside forRoot', 'CassandraModule');

    // anything we create in here should be a provider that can be injected into other initialization (useFactory) code;
    // we need to create providers for
    // - client options
    // - the cassandra client object itself
    // I think that's it

    // then in forFeature, we inject the cassandra client object to the useFactory function
    // and use that to create repositories based on the models that we detected

    // provide the cassandra client config
    const cassandraConfigProvider: Provider = {
      provide: CASSANDRA_CLIENT_CONFIG_TOKEN,
      useValue: config,
    };

    // provide the cassandra client so that it can be injected into repositories later
    const cassandraClientProvider: Provider = {
      provide: CASSANDRA_CLIENT_TOKEN,
      useFactory: () => cassandraConnectionFactory(config),
    };

    return {
      module: CassandraModule,
      providers: [cassandraConfigProvider, cassandraClientProvider],
      exports: [cassandraClientProvider],
    };
  }

  static forFeature() {
    // inject all of the models that we detected via decorators
    const repoProviders: Provider[] = DetectedModels.map(([model, config]) => ({
      // if they provided a special token, use that. Otherwise just use the class name as the token
      provide: config.modelToken ?? model.name,
      // create a repository for every model using the cassandra client we got from CassandraModule.forRoot
      useFactory: (client: CassandraClient) => {
        return cassandraRepositoryFactory(client, model);
      },
      // inject the cassandra client we got from CassandraModule.forRoot
      inject: [{ token: CASSANDRA_CLIENT_TOKEN, optional: false }],
    }));

    return {
      module: CassandraModule,
      providers: [...repoProviders],
      exports: [...repoProviders],
    };
  }
}
