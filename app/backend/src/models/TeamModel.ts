import { Identifier } from 'sequelize';
import Team from '../database/models/Team';

export default class TeamModel {
  constructor(private _db = Team) {}

  async findAll() { return this._db.findAll(); }

  async findByPk(pk: Identifier) { return this._db.findByPk(pk); }
}
