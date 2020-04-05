export class ConfirmEmail {

  public static readonly type: string = '[ConfirmEmail Page] Confirm Email';

  public constructor(
    public email: string,
    public code: string
  ) { }

}
