import { AppConfigService } from '@gateway/infrastructure/config';
import { Providers } from '@gateway/proxies/auth/enums';
import { SignupRequestDto } from '@gateway/proxies/auth/request';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: AppConfigService) {
    super({
      clientID: configService.OAUTH_CLIENT_ID,
      clientSecret: configService.OAUTH_CLIENT_SECRET,
      authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenURL: 'https://oauth2.googleapis.com/token',
      callbackURL: 'http://localhost:7777/auth/signup', // your redirect URI, validate will return the user object as req.user at this callback url only
      scope: ['profile', 'email'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    // const { name, emails, photos } = profile;
    // const user = {
    //   email: emails?.[0].value,
    //   firstName: name?.givenName,
    //   lastName: name?.familyName,
    //   picture: photos?.[0].value,
    //   accessToken,
    // };

    const profileInfo = profile._json;

    const {
      sub,
      email,
      email_verified,
      iat,
      exp,
      given_name,
      family_name,
      picture,
    } = profileInfo;

    const userPayloadForSignup: SignupRequestDto = {
      provider: Providers.GOOGLE,
      providerId: sub,
      email,
      email_verified,
      fullName: `${given_name} ${family_name}`,
      avatar: picture,
      accessToken,
      refreshToken,
      iat,
      exp,
    };

    done(null, userPayloadForSignup);
  }
}
