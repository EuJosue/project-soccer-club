import { Response } from 'express';
import RequestWithUser from '../interfaces/RequestWithUser';
import MatchService from '../services/MatchService';

export default class TeamController {
  constructor(
    private _loginService = new MatchService(),
  ) {}

  async findAll(_req: RequestWithUser, res: Response) {
    const matches = await this._loginService.findAll();

    return res.json(matches);
  }

  async findAllWithTeamName(req: RequestWithUser, res: Response) {
    const { inProgress } = req.query;

    const matches = await this._loginService
      .findAllWithTeamName(inProgress as string | undefined);

    return res.json(matches);
  }

  async finishMatch(req: RequestWithUser, res: Response) {
    const { id } = req.params;

    await this._loginService.finishMatch(Number(id));

    return res.json({ message: 'Finished' });
  }

  async update(req: RequestWithUser, res: Response) {
    const { id } = req.params;
    const changes = req.body;

    await this._loginService.update(Number(id), changes);

    return res.json({ message: 'Updated' });
  }

  async create(req: RequestWithUser, res: Response) {
    const match = req.body;

    const newMatch = await this._loginService.create(match);

    return res.status(201).json(newMatch);
  }
}
