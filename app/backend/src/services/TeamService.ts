import TeamModel from "../models/TeamModel";

export default class TeamService {
  constructor(private teamModel = new TeamModel()) {}

  async findAll() { return this.teamModel.findAll(); }
}