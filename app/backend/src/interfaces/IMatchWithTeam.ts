import IMatch from './IMatch';

export default interface IMatchWithTeam extends IMatch {
  homeTeam: { teamName: string },
  awayTeam: { teamName: string }
}
