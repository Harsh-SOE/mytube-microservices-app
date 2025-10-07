import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtraVerificationParams, Profile, Strategy } from 'passport-auth0';

import { AppConfigService } from '@gateway/infrastructure/config';

import { GATEWAY_AUTH0_GAURD_STRATEGY } from '../constants';
import { Auth0ProfileUser } from '../payloads';

@Injectable()
export class Auth0Strategy extends PassportStrategy(
  Strategy,
  GATEWAY_AUTH0_GAURD_STRATEGY,
) {
  constructor(private configService: AppConfigService) {
    super({
      clientID: configService.AUTH0_CLIENT_ID,
      clientSecret: configService.AUTH0_CLIENT_SECRET,
      domain: configService.AUTH0_CLIENT_DOMAIN,
      callbackURL: configService.AUTH0_CALLBACK_URL,
      state: true,
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    extraParams: ExtraVerificationParams,
    profile: Profile & { picture?: string },
  ): Auth0ProfileUser {
    console.log(`Auth0 strategy was selected`);

    console.log(`Access Token is: ${accessToken}`);
    console.log(`Refresh Token is: ${refreshToken}`);
    console.log(`Profile is: ${JSON.stringify(profile)}`);

    const { id, provider, name, username, photos, emails, birthday } = profile;

    const email = emails?.[0].value;
    const fullName = `${name?.givenName} ${name?.middleName} ${name?.familyName}`;
    const avatar = profile?.picture ?? photos?.[0].value;

    return {
      provider,
      providerId: id,
      email,
      fullName,
      avatar,
      dob: birthday,
      userName: username,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
