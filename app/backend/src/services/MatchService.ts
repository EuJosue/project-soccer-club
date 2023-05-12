import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError';
import MatchUpdate from '../interfaces/MatchUpdate';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(private _matchModel = new MatchModel()) {}

  async findAll() { return this._matchModel.findAll(); }

  async findAllWithTeamName(inProgress: string | undefined) {
    if (inProgress === undefined) return this._matchModel.findAllWithTeamName();

    return this._matchModel.findAllWithTeamNameInProgress(inProgress === 'true');
  }

  async finishMatch(id: number) { return this._matchModel.finishMatch(id); }

  async update(id: number, changes: MatchUpdate) {
    const [affectedRows] = await this._matchModel.update(id, changes);

    if (!affectedRows) throw new ApiError(StatusCodes.NOT_FOUND, 'Match not found');
  }
}
