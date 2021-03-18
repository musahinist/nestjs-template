import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import * as mongoose from 'mongoose';
export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true })
  title?: string;
  @Prop()
  desc?: string;
  @Prop()
  type?: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner?: User;
  @Prop({ default: false })
  isDone?: boolean;
  @Prop({ default: false })
  isArchived?: boolean;
  // @Prop({ type: Date, default: Date.now })
  // createdAt?: Date;
  // @Prop()
  // complatedAt?: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
