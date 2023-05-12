import Match from '../database/models/Match';

export default class MatchModel {
  constructor(private _db = Match) {}

  async findAll() { return this._db.findAll(); }

  async findAllWithTeamName() { return this._db.scope('withTeamName').findAll(); }

  async findAllWithTeamNameInProgress(inProgress: boolean) {
    return this._db.scope('withTeamName').findAll({ where: { inProgress } });
  }
}
