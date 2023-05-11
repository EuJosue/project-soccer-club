import IEmail from '../interfaces/IEmail';
import UserModel from '../models/UserModel';

export default class TeamService {
  constructor(private userModel = new UserModel()) {}

  async findByEmail({ email }: IEmail) {
    return this.userModel.findByEmail({ email });
  }
}
