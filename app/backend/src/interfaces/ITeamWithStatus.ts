export default interface ITeamWithStatus {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
}

export type HomeTeam = ITeamWithStatus;

export type AwayTeam = ITeamWithStatus;
