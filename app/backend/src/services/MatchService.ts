import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError';
import MatchUpdate from '../interfaces/MatchUpdate';
import MatchModel from '../models/MatchModel';
import IMatch from '../interfaces/IMatch';

export default class MatchService {
  constructor(private _matchModel = new MatchModel()) {}

  async findAll() { return this._matchModel.findAll(); }

  async findAllWithTeamName(inProgress: string | undefined) {
    if (inProgress === undefined) return this._matchModel.findAllWithTeamName();

    return this._matchModel.findAllWithTeamNameInProgress(inProgress === 'true');
  }

  async finishMatch(id: number) {
    const [affectedRows] = await this._matchModel.finishMatch(id);

    if (affectedRows < 1) throw new ApiError(StatusCodes.NOT_FOUND, 'Match not found');
  }

  async update(id: number, changes: MatchUpdate) {
    const [affectedRows] = await this._matchModel.update(id, changes);

    if (affectedRows < 1) throw new ApiError(StatusCodes.NOT_FOUND, 'Match not found');
  }

  async create(match: IMatch) {
    const [newMatch, created] = await this._matchModel.findOrCreate(match);

    if (!created) throw new ApiError(StatusCodes.CONFLICT, 'Match already exists');

    return newMatch;
  }
}
