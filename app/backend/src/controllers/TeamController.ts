import { Request, Response } from "express";
import TeamService from "../models/TeamModel";

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  async findAll(_req: Request, res: Response) {
    const teams = await this.teamService.findAll();

    return res.json(teams);
  }
}