import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';

import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(user: CreateUserDto) {
    return from(new this.userModel(user).save());
  }

  findAll(usersFilterQuery: FilterQuery<User>) {
    return from(this.userModel.find(usersFilterQuery));
  }

  async findOne(usersFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(usersFilterQuery);
  }

  async update(
    usersFilterQuery: FilterQuery<User>,
    updateUser: Partial<User>,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate(usersFilterQuery, updateUser, {
      new: true,
    });
  }

  async remove(usersFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOneAndDelete(usersFilterQuery);
  }
}
