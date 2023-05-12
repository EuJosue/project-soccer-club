import IMatch from '../interfaces/IMatch';
import MatchUpdate from '../interfaces/MatchUpdate';
import Match from '../database/models/Match';

export default class MatchModel {
  constructor(private _db = Match) { }

  async findAll() { return this._db.findAll(); }

  async findAllWithTeamName() { return this._db.scope('withTeamName').findAll(); }

  async findAllWithTeamNameInProgress(inProgress: boolean) {
    return this._db.scope('withTeamName').findAll({ where: { inProgress } });
  }

  async finishMatch(id: number) {
    return this._db.update({ inProgress: false }, { where: { id } });
  }

  async update(id: number, changes: MatchUpdate) {
    return this._db.update(
      changes,
      { where: { id, inProgress: true } },
    );
  }

  async findOrCreate(match: IMatch) {
    return this._db.findOrCreate({
      where: { homeTeamId: match.homeTeamId, awayTeamId: match.awayTeamId, inProgress: true },
      defaults: { ...match },
    });
  }
}
