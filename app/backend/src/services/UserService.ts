import UserModel from '../models/UserModel';

export default class UserService {
  constructor(private userModel = new UserModel()) {}
}
