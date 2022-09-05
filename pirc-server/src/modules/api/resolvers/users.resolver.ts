import { Injectable, ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '../../cassandra/decorators/inject-repository.decorator';
import { Repository } from '../../cassandra/lib/repository';
import { UserModel } from '../models/user.model';
import { SignupInput } from '../../../graphql';

@Injectable()
@Resolver()
export class UsersResolver {
  constructor(
    @InjectRepository(UserModel) private _userRepository: Repository<UserModel>,
  ) {}

  @Query('user')
  getUser(@Args('id', ParseIntPipe) id: number) {
    return this._userRepository.select('*').where('id', '=', id).first();
  }

  @Mutation('signup')
  signup(@Args('input') input: SignupInput) {
    return this._userRepository.insert({ ...input });
  }
}
