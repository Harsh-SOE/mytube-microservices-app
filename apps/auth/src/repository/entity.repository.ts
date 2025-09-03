export interface BaseEntityRepository<TDomainModel, TFilter> {
  create(entity: TDomainModel): Promise<TDomainModel>;

  deleteOne(filter: TFilter): Promise<boolean>;

  updatePassword(filter: TFilter, newPassword: string): Promise<TDomainModel>;

  updatePasswordById(id: string, newPassword: string): Promise<TDomainModel>;

  findOne(filter: TFilter): Promise<TDomainModel>;
}
