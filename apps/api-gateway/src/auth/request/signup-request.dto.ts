import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignupRequestDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @IsNotEmpty()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsString()
  coverImage?: string;
}
