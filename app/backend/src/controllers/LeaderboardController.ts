import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private _Service = new LeaderboardService()) {}

  async findAllHome(_req: Request, res: Response) {
    const leaderboard = await this._Service.findAllHome();

    return res.json(leaderboard);
  }
}
