import {
  IsDateString,
  // IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserRequestDto {
  // @IsString()
  // @IsNotEmpty()
  // id: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsDateString()
  @IsOptional()
  dob?: string;
}
