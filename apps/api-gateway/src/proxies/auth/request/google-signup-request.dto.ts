import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Providers } from '../enums';

export class GoogleSignupRequestDto {
  @IsOptional()
  @IsString()
  providerId: string;

  @IsNotEmpty()
  @IsEnum(Providers)
  provider: Providers = Providers.GOOGLE;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @IsNotEmpty()
  @IsString()
  avatar: string;

  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  @IsNotEmpty()
  @IsNumber()
  iat: number;

  @IsNotEmpty()
  @IsNumber()
  exp: number;

  @IsOptional()
  @IsString()
  coverImage?: string;
}
