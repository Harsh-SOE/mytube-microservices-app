import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Providers } from '../enums';

export class LocalSignupRequestDto {
  @IsNotEmpty()
  @IsEnum(Providers)
  provider: Providers = Providers.LOCAL;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsOptional()
  dob: string;

  @IsNotEmpty()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsString()
  coverImage?: string;
}
