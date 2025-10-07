import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class SaveUserProfileDto {
  @IsString()
  @IsNotEmpty()
  authId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  handle: string;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;

  @IsDateString()
  @IsOptional()
  dob?: string;
}
