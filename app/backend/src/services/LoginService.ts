import { StatusCodes } from 'http-status-codes';
import { hashSync, compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import IJwtPayload from '../interfaces/IJwtPayload';
import ILogin from '../interfaces/ILogin';
import ApiError from '../utils/ApiError';
import UserModel from '../models/UserModel';

export default class LoginService {
  constructor(private userModel = new UserModel()) { }

  async login({ email, password }: ILogin) {
    const user = await this.userModel.findByEmail({ email });

    if (!user || LoginService.comparePass(password, user.password)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'All fields must be filled');
    }

    return LoginService.generateToken({ id: user.id, email: user.email });
  }

  private static encryptPass(password: string) {
    return hashSync(password);
  }

  private static comparePass(password: string, hash: string) {
    return compareSync(password, hash);
  }

  private static generateToken(payload: IJwtPayload) {
    const secret = process.env.JWT_SECRET || 'secret';

    return sign(payload, secret, { expiresIn: '1d' });
  }
}
