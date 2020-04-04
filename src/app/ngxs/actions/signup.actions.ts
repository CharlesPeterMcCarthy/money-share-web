import { SignUpData } from '../../services/auth/auth.service';

export class AttemptSignUp {

  public static readonly type: string = '[Sign Up Page] Attempt Sign Up';

  public constructor(
    public signUpData: SignUpData
  ) { }

}
