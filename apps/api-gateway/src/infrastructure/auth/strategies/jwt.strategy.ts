import {
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { firstValueFrom } from 'rxjs';

import { USER_SERVICE_NAME, UserServiceClient } from '@app/contracts/users';
import { UserAuthPayload } from '@app/contracts/auth';
import { CLIENT_PROVIDER } from '@app/clients/constant';

import { AppConfigService } from '@gateway/infrastructure/config';

import { GATEWAY_GAURD_STRATEGY } from '../constants';

@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy, GATEWAY_GAURD_STRATEGY)
  implements OnModuleInit
{
  private userService: UserServiceClient;

  constructor(
    readonly configService: AppConfigService,
    @Inject(CLIENT_PROVIDER.USER) private readonly userClient: ClientGrpc,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['RS256'],
      secretOrKey: configService.JWT_PUBLIC_KEY,
    });
  }

  onModuleInit() {
    this.userService = this.userClient.getService(USER_SERVICE_NAME);
  }

  async validate(payload: UserAuthPayload): Promise<UserAuthPayload> {
    const { id, email, authId, handle } = payload;
    console.log(`---> GUARDED ROUTE <---`);
    const response$ = this.userService.findOneUserById({ id });
    const user = await firstValueFrom(response$);
    console.log(user);

    if (!user) {
      throw new UnauthorizedException(`Complete Profile inorder to continue!`);
    }

    const finalUser: UserAuthPayload = {
      id,
      authId,
      email,
      handle,
    };
    return finalUser;
  }
}
