interface PrimaryKey {
  partitionKey: string[];
  custeringColumns: string[];
}

export interface MaterializedView {
  name: string;
  primaryKey: PrimaryKey;
}
