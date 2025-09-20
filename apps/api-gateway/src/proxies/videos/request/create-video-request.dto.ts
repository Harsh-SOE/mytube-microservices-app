import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import {
  VideoRequestPublishStatus,
  VideoRequestVisibilityStatus,
} from '../enums';

export class CreateVideoRequestDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  videoFileUrl: string;

  @IsEnum(VideoRequestPublishStatus)
  status: VideoRequestPublishStatus = VideoRequestPublishStatus.PENDING;

  @IsEnum(VideoRequestVisibilityStatus)
  visibility: VideoRequestVisibilityStatus =
    VideoRequestVisibilityStatus.PRIVATE;
}
