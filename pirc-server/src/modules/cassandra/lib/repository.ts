class QueryBuilder<T> {
  constructor(private _result: T[]) {}

  where(key: keyof T, op: '=', value: any) {
    const newResult = this._result.filter((row) => row[key] === value);
    return new QueryBuilder(newResult);
  }

  andWhere = this.where.bind(this);

  first() {
    return this._result[0];
  }

  last() {
    return this._result[this._result.length - 1];
  }

  all() {
    return this._result;
  }
}

export class Repository<T extends { id: number }> {
  private _rows: T[] = [];

  constructor(private readonly _modelName?: string) {
    console.log('initializing repo class for', this._modelName);
  }

  select(columns: string) {
    return new QueryBuilder(this._rows);
  }

  insert(row: Partial<T>) {
    if (!row.id) {
      row.id = this._rows.length;
    }
    this._rows.push(row as T);
    return row;
  }
}
