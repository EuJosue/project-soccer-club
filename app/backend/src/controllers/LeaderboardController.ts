import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private _Service = new LeaderboardService()) {}

  async findAll(_req: Request, res: Response) {
    const leaderboard = await this._Service.findAll();

    return res.json(leaderboard);
  }
}
