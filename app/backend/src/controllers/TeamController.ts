import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  async findAll(_req: Request, res: Response) {
    const teams = await this.teamService.findAll();

    return res.json(teams);
  }

  async findByPk(req: Request, res: Response) {
    const { id } = req.params;

    const team = await this.teamService.findByPk(Number(id));

    return res.json(team);
  }
}
