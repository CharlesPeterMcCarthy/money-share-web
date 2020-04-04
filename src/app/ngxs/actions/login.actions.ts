export class AttemptLogin {

  public static readonly type: string = '[Login Page] Attempt Login';

  public constructor(
    public email: string,
    public password: string
  ) { }

}
