import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true }) //{ useCreateIndex: true }
export class User {
  @ApiProperty()
  @Prop()
  name?: string;
  @ApiProperty()
  @Prop({
    unique: true,
    required: true,
    // index: true,
    //  sparse: true,

    // validate: {
    //   isAsync: true,
    //   validator: function (value, isValid) {
    //     const self = this;
    //     return self.constructor
    //       .findOne({ email: value })
    //       .exec(function (err, user) {
    //         if (err) {
    //           throw err;
    //         } else if (user) {
    //           if (self.id === user.id) {
    //             // if finding and saving then it's valid even for existing email
    //             return isValid(true);
    //           }
    //           return isValid(false);
    //         } else {
    //           return isValid(true);
    //         }
    //       });
    //   },
    //   message: 'The email address is already taken!',
    // },
  })
  email?: string;
  @Prop({
    type: String,
    required: true,
    // expose: false,
    //  select: false,
  })
  password?: string;

  @ApiProperty()
  @Prop()
  age?: number;

  @ApiProperty()
  @Prop([String])
  favorites?: string[];

  @ApiProperty()
  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
//UserSchema.index({ email: 1 }, { unique: true, sparse: true });
