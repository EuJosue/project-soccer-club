import * as bcrypt from 'bcryptjs';

export default class Crypt {
  constructor(private _crypt = bcrypt) {}

  public encrypt(string: string): string {
    return this._crypt.hashSync(string);
  }

  public compare(string: string, hash: string): boolean {
    return this._crypt.compareSync(string, hash);
  }
}
