import { Injectable } from '@nestjs/common';
import { DetectedColumns } from './decorators/column.decorator';
import { CASSANDRA_MODEL_METADATA } from './lib/constants';

@Injectable()
export class CassandraService {
  private _repositories = new Map<string, any>();

  registerModel(model: ObjectConstructor) {
    const _columns = DetectedColumns.filter(
      (column) => column.parentClass.name === model.name,
    );
    console.log(model.name, 'columns:', _columns);

    // const modelKey =

    // this._repositories.set();
  }
}
