import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from '../api/api.module';
import { CassandraModule } from '../cassandra/cassandra.module';

// create an instance of the graphql module
const graphqlModule = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  // read all the GraphQL type files
  typePaths: ['./**/*.graphql'],
  definitions: {
    path: join(process.cwd(), 'src/graphql.ts'),
  },
});

@Module({
  imports: [
    CassandraModule.forRoot({ host: 'localhost', port: 9042 }),
    graphqlModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
