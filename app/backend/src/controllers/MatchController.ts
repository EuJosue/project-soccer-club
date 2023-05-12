import { Response } from 'express';
import RequestWithUser from '../interfaces/RequestWithUser';
import MatchService from '../services/MatchService';

export default class TeamController {
  constructor(
    private _loginService = new MatchService(),
  ) {}

  async findAll(_req: RequestWithUser, res: Response) {
    const matches = await this._loginService.findAll();

    return res.json(matches);
  }

  async findAllWithTeamName(_req: RequestWithUser, res: Response) {
    const matches = await this._loginService.findAllWithTeamName();

    return res.json(matches);
  }
}
