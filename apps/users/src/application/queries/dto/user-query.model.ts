export class UserQueryModel {
  constructor(
    readonly id: string,
    readonly userName: string,
    readonly fullName: string,
    readonly email: string,
    readonly dob: Date,
    readonly avatar: string,
    readonly coverImage: string | undefined,
  ) {}
}
