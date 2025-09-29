export interface BaseEntityRepository<TPersistance, TFilter> {
  saveUserCredentials(entity: TPersistance): Promise<TPersistance>;

  deleteUserCredentials(filter: TFilter): Promise<TPersistance>;

  deleteUserCredentialsById(id: string): Promise<TPersistance>;

  updateSigninPassword(
    filter: TFilter,
    newPassword: string,
  ): Promise<TPersistance>;

  updateSigninPasswordById(
    id: string,
    newPassword: string,
  ): Promise<TPersistance>;

  FindOneUser(filter: TFilter): Promise<TPersistance>;

  FindOneUserById(id: string): Promise<TPersistance>;
}
