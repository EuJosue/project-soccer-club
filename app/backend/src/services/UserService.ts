import UserModel from '../models/UserModel';

export default class TeamModel {
  constructor(private userModel = new UserModel()) {}
}
