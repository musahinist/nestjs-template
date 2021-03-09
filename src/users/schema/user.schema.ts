import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  userId: string;
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  age: number;
  @Prop([String])
  favorites: string[];
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
