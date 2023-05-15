export default interface ITeamWithStatus {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

export type HomeTeam = ITeamWithStatus;

export type AwayTeam = ITeamWithStatus;
