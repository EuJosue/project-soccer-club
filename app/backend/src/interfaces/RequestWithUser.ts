import IId from './IId';

export default interface RequestWithUser extends Request {
  user: IId
}
