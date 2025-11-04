import { DislikesFindCountForAVideoDto } from '@app/contracts/likes';

export class GetDislikesVideoQuery {
  public constructor(
    public readonly dislikesFindCountForAVideoDto: DislikesFindCountForAVideoDto,
  ) {}
}
