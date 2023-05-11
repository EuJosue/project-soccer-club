import { StatusCodes } from 'http-status-codes';
import ILogin from '../interfaces/ILogin';
import ApiError from '../utils/ApiError';
import UserModel from '../models/UserModel';
import Auth from '../utils/Auth';
import Crypt from '../utils/Crypt';
import User from '../database/models/User';

export default class LoginService {
  constructor(
    private _userModel = new UserModel(),
    private _auth = new Auth(),
    private _crypt = new Crypt(),
  ) {}

  async login({ email, password }: ILogin) {
    const user = await this._userModel.findByEmail({ email }) as User;

    this._validatePassword(user, password);

    return this._auth.generateToken({ id: user.id, email: user.email });
  }

  private _validatePassword(user: User | null, password: string): void {
    if (!user || !this._crypt.compare(password, user.password)) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');
    }
  }
}
