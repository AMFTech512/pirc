import { Module } from '@nestjs/common';
import { CassandraModule } from '../cassandra/cassandra.module';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [CassandraModule.forFeature()],
  providers: [UsersResolver],
})
export class UsersModule {}
