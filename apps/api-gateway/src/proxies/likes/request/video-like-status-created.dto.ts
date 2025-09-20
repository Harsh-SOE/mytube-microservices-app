import { IsEnum, IsNotEmpty } from 'class-validator';
import { LikeRequestStatus } from '../enums';

export class VideoLikeStatusCreatedDto {
  @IsNotEmpty()
  @IsEnum(LikeRequestStatus)
  likeStatus: LikeRequestStatus;
}
