import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(private _matchModel = new MatchModel()) {}

  async findAll() { return this._matchModel.findAll(); }

  async findAllWithTeamName(inProgress: string | undefined) {
    if (inProgress === undefined) return this._matchModel.findAllWithTeamName();

    return this._matchModel.findAllWithTeamNameInProgress(inProgress === 'true');
  }
}
