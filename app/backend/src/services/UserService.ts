import { StatusCodes } from 'http-status-codes';
import User from '../database/models/User';
import UserModel from '../models/UserModel';
import IId from '../interfaces/IId';
import ApiError from '../utils/ApiError';

export default class UserService {
  constructor(private _userModel = new UserModel()) {}

  async findById({ id }: IId) {
    const user = await this._userModel.findById(id) as User;

    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');

    return user;
  }
}
