import { State, Action, StateContext } from '@ngxs/store';
import { AuthService, CustomAuthError, CustomResponse } from '../../services/auth/auth.service';
import { AttemptSignUp } from '../actions';
import { Injectable } from '@angular/core';

export interface SignUpStateModel {
  isSignedUp: boolean;
  error?: CustomAuthError;
}

@Injectable()
@State<SignUpStateModel>({
  name: 'signUp',
  defaults: {
    isSignedUp: false,
    error: undefined
  }
})
export class SignUpState {

  public constructor(private _auth: AuthService) { }

  @Action(AttemptSignUp)
  public async attemptSignUp(ctx: StateContext<SignUpStateModel>, action: AttemptSignUp): Promise<void> {
    const state = ctx.getState();
    const res: CustomResponse = await this._auth.signUp(action.signUpData);

    ctx.setState({
      ...state,
      isSignedUp: res.success,
      error: !res.success ? res.error : undefined
    });
  }
}
