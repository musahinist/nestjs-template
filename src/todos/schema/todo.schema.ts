import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop()
  todoId: string;
  @Prop()
  title: string;
  @Prop()
  desc: string;
  @Prop()
  type: string;
  @Prop({ default: false })
  isDone: boolean;
  @Prop({ default: false })
  isArchived: boolean;
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
  @Prop()
  complatedAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
