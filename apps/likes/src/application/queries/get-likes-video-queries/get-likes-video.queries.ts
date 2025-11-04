import { LikesFindCountForAVideoDto } from '@app/contracts/likes';

export class GetLikesVideoQuery {
  public constructor(
    public readonly likesFindCountForAVideoDto: LikesFindCountForAVideoDto,
  ) {}
}
