import { Injectable } from '@nestjs/common';

import { HubBio, HubCoverImage, HubUserId } from '@hub/domain/value-objects';

@Injectable()
export class HubEntity {
  public constructor(
    private readonly id: string,
    private readonly userId: HubUserId,
    private bio: HubBio,
    private coverImage?: HubCoverImage,
    private isHubVerified?: boolean,
    private isHubMonitized?: boolean,
  ) {}

  public getId() {
    return this.id;
  }

  public getUserId() {
    return this.userId;
  }

  public getBio() {
    return this.bio;
  }

  public getCoverImage() {
    return this.coverImage;
  }

  public getIsHubVerified() {
    return this.isHubVerified;
  }

  public getIsHubMonitized() {
    return this.isHubMonitized;
  }

  public getHubSnapshot() {
    return {
      id: this.id,
      userId: this.userId.getValue(),
      bio: this.bio.getValue(),
      coverImage: this.coverImage?.getValue(),
      isHubMonitized: this.isHubMonitized,
      isHubVerified: this.isHubVerified,
    };
  }

  public updateHubBio(bio?: string) {
    this.bio = HubBio.create(bio);
    return;
  }

  public updateHubCoverImage(coverImage?: string) {
    this.coverImage = HubCoverImage.create(coverImage);
    return;
  }

  public monitizeHub() {
    this.isHubMonitized = true;
  }

  public demonitizeHub() {
    this.isHubMonitized = false;
  }

  public verifyHub() {
    this.isHubVerified = true;
  }
}
