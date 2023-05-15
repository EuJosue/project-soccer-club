import ITeamWithStatus, { AwayTeam, HomeTeam } from '../interfaces/ITeamWithStatus';
import MatchModel from '../models/MatchModel';
import IMatchWithTeam from '../interfaces/IMatchWithTeam';

export default class LeaderboardService {
  private static emptyTeamWithStatus: ITeamWithStatus = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
  };

  constructor(private _MatchModel = new MatchModel()) {}

  async findAll(): Promise<ITeamWithStatus[]> {
    const matches = await this._MatchModel.findAllWithTeamNameInProgress(false);

    const totalGames = matches.reduce(LeaderboardService.countGames, {});

    return Object.values(totalGames).sort((a, b) => b.totalPoints - a.totalPoints);
  }

  private static countGames(
    matchesObj: { [key: string]: ITeamWithStatus },
    match: IMatchWithTeam,
  ) {
    const newMatchesObj = { ...matchesObj };
    const [homeTeam, awayTeam] = LeaderboardService.matchToTeam(match, [
      matchesObj[match.homeTeam.teamName],
      matchesObj[match.awayTeam.teamName],
    ]);

    newMatchesObj[homeTeam.name] = homeTeam;
    newMatchesObj[awayTeam.name] = awayTeam;

    return newMatchesObj;
  }

  private static matchToTeam(
    match: IMatchWithTeam,
    teams: [HomeTeam, AwayTeam],
  ): [HomeTeam, AwayTeam] {
    const homeTeamOrEmpty = teams[0] || LeaderboardService.emptyTeamWithStatus;
    const awayTeamOrEmpty = teams[1] || LeaderboardService.emptyTeamWithStatus;

    const homeTeam = { name: match.homeTeam.teamName,
      goalsFavor: match.homeTeamGoals,
      goalsOwn: match.awayTeamGoals };

    const awayTeam = { name: match.awayTeam.teamName,
      goalsFavor: match.awayTeamGoals,
      goalsOwn: match.homeTeamGoals };

    return [
      LeaderboardService.teamWithStatusCreator(homeTeam, homeTeamOrEmpty),
      LeaderboardService.teamWithStatusCreator(awayTeam, awayTeamOrEmpty),
    ];
  }

  private static pointsEarned(goalsFavor: number, goalsOwn: number) {
    if (goalsFavor === goalsOwn) return 1;
    return goalsFavor > goalsOwn ? 3 : 0;
  }

  private static teamWithStatusCreator(team: {
    name: string,
    goalsFavor: number,
    goalsOwn: number,
  }, oldTeam: ITeamWithStatus): ITeamWithStatus {
    const pointsEarned = LeaderboardService.pointsEarned(team.goalsFavor, team.goalsOwn);

    return {
      name: team.name,
      totalPoints: oldTeam.totalPoints + pointsEarned,
      totalGames: oldTeam.totalGames + 1,
      totalVictories: oldTeam.totalVictories + (pointsEarned === 3 ? 1 : 0),
      totalDraws: oldTeam.totalDraws + (pointsEarned === 1 ? 1 : 0),
      totalLosses: oldTeam.totalLosses + (pointsEarned === 0 ? 1 : 0),
      goalsFavor: oldTeam.goalsFavor + team.goalsFavor,
      goalsOwn: oldTeam.goalsOwn + team.goalsOwn,
    };
  }
}
