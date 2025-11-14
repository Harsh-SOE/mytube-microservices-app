import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GATEWAY_GAURD_STRATEGY } from '../types';

@Injectable()
export class GatewayJwtGuard extends AuthGuard(GATEWAY_GAURD_STRATEGY) {}
