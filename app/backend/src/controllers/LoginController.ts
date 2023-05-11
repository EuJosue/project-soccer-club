import { Request, Response } from 'express';
import ILogin from '../interfaces/ILogin';
import LoginService from '../services/LoginService';

export default class TeamController {
  constructor(private loginService = new LoginService()) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body as ILogin;

    const token = await this.loginService.login({ email, password });

    return res.json({ token });
  }
}
