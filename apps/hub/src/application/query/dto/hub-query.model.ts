export class HubQueryModel {
  public readonly id: string;
  public readonly userId: string;
  public readonly bio: string | null;
  public readonly isHubMonitized: boolean | null;
  public readonly isHubVerified: boolean | null;
  public readonly hubCoverImage: string | null;
}
