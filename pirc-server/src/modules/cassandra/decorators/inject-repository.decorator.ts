import { Inject } from '@nestjs/common';

export const InjectRepository = (token: any) =>
  Inject(typeof token === 'string' ? token : token.name);
