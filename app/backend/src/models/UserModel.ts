import { Identifier } from 'sequelize';
import IEmail from '../interfaces/IEmail';
import User from '../database/models/User';

export default class UserModel {
  constructor(private _db = User) {}

  async findByEmail({ email }: IEmail) {
    return this._db.findOne({ where: { email } });
  }

  async findById(id: Identifier) {
    return this._db.findByPk(id);
  }
}
