export type Operators = 'eq' | 'ne' | 'gte' | 'gt' | 'lte' | 'lt';

export type FieldCondition<PersistanceSchema> = {
  field: keyof PersistanceSchema;
  operator: Operators;
  value: any;
};

export type DatabaseFilter<PersistanceSchema> = Partial<{
  [K in keyof PersistanceSchema]: PersistanceSchema[K];
}> & {
  and?: Array<FieldCondition<PersistanceSchema>>;
  or?: Array<FieldCondition<PersistanceSchema>>;
  not?: Array<FieldCondition<PersistanceSchema>>;
};
