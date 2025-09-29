import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GatewayGoogleOAuthGaurd extends AuthGuard('google') {}
