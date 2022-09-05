import { Column } from '../../cassandra/decorators/column.decorator';
import { Model } from '../../cassandra/decorators/model.decorator';

@Model({ table: 'users_by_id' })
export class UserModel {
  @Column('INT')
  id: number;

  @Column('TEXT')
  username: string;

  @Column('TEXT')
  gender: string;
}
