import * as jwt from 'jsonwebtoken';

export default class Auth {
  private _secret = process.env.JWT_SECRET || 'secret';

  constructor(private _jwt = jwt) {}

  public generateToken(data: object): string {
    return this._jwt.sign(data, this._secret, { expiresIn: '1d' });
  }

  public verifyToken(token: string): object {
    const data = this._jwt.verify(token, this._secret);

    return typeof data === 'string' ? JSON.parse(data) : data;
  }
}
