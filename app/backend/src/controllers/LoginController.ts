import { Request, Response } from 'express';
import ILogin from '../interfaces/ILogin';
import LoginService from '../services/LoginService';
import UserService from '../services/UserService';
import RequestWithUser from '../interfaces/RequestWithUser';

export default class TeamController {
  constructor(
    private _loginService = new LoginService(),
    private _userService = new UserService(),
  ) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body as ILogin;

    const token = await this._loginService.login({ email, password });

    return res.json({ token });
  }

  async findRole(req: RequestWithUser, res: Response) {
    const { id } = req.user;

    const user = await this._userService.findById({ id });

    return res.json(user.role);
  }
}
