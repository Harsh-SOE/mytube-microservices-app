import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';

import { BaseEntitySchema } from './base-schema';

@Schema({ collection: 'auth-users', timestamps: true })
export class UserAuth extends BaseEntitySchema {
  @Prop({ type: String, default: uuid, unique: true, index: true })
  public readonly _id: string;

  @Prop()
  public readonly userId: string;

  @Prop()
  public readonly userPasswordHash: string;
}

// Create Mongoose schema object
export const UserAuthSchema = SchemaFactory.createForClass(UserAuth);

// Create a Document interface for injection typing
export type UserAuthDocument = UserAuth & Document;
