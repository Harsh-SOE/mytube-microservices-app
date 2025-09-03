import {
  UserAvatarImage,
  UserCoverImage,
  UserDOB,
  UserEmail,
  UserFullName,
  UserName,
} from '@users/domain/value-objects';

export class UserEntity {
  constructor(
    private readonly id: string,
    private userName: UserName,
    private email: UserEmail,
    private fullName: UserFullName,
    private dob: UserDOB,
    private avatar: UserAvatarImage,
    private coverImage: UserCoverImage,
  ) {}

  public getId(): string {
    return this.id;
  }

  public getUserName(): string {
    return this.userName.getValue();
  }

  public getFullName(): string {
    return this.fullName.getValue();
  }

  public getEmail(): string {
    return this.email.getValue();
  }

  public getDob(): Date {
    return this.dob.getValue();
  }

  public getAvatar(): string {
    return this.avatar.getValue();
  }

  public getCoverImage(): string | undefined {
    return this.coverImage.getValue();
  }

  public getSnapshot() {
    return {
      id: this.id,
      userName: this.userName.getValue(),
      email: this.email.getValue(),
      fullName: this.fullName.getValue(),
      dob: this.dob.getValue(),
      avatar: this.avatar.getValue(),
      coverImage: this.coverImage?.getValue(),
    };
  }

  public updateUserName(newUserName: string): void {
    this.userName = UserName.create(newUserName);
    return;
  }

  public updateEmail(newEmail: string): void {
    this.email = UserEmail.create(newEmail);
    return;
  }

  public updateFullName(newFullName: string): void {
    this.fullName = UserFullName.create(newFullName);
    return;
  }

  public updateDOB(newDOB: Date): void {
    this.dob = UserDOB.create(newDOB);
    return;
  }

  public updateAvatar(newAvatar: string): void {
    this.avatar = UserAvatarImage.create(newAvatar);
    return;
  }

  public updateCoverImage(newCoverImage: string): void {
    this.coverImage = UserCoverImage.create(newCoverImage);
    return;
  }
}
