import { IsNotEmpty, IsString } from 'class-validator';

export class SigninRequestDTO {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
