import { Identifier } from 'sequelize';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(private teamModel = new TeamModel()) {}

  async findAll() { return this.teamModel.findAll(); }

  async findByPk(pk: Identifier) {
    const team = await this.teamModel.findByPk(pk);

    if (!team) throw new ApiError(StatusCodes.NOT_FOUND, 'Team not found');

    return team;
  }
}
