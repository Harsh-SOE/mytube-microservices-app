import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Providers } from '../enums';

export class SignupRequestDto {
  @IsOptional()
  @IsString()
  providerId?: string;

  @IsNotEmpty()
  @IsEnum(Providers)
  provider: Providers = Providers.LOCAL;

  @IsOptional()
  @IsString()
  userName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsBoolean()
  email_verified?: boolean;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsStrongPassword()
  password?: string;

  @IsDateString()
  @IsOptional()
  dob?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  accessToken?: string;

  @IsOptional()
  @IsString()
  refreshToken?: string;

  @IsOptional()
  @IsNumber()
  iat?: number;

  @IsOptional()
  @IsNumber()
  exp?: number;

  @IsOptional()
  @IsString()
  coverImage?: string;
}
