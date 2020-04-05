import { State, Action, StateContext } from '@ngxs/store';
import { AuthService, CustomAuthError, CustomResponse } from '../../services/auth/auth.service';
import { ConfirmEmail } from '../actions';
import { Injectable } from '@angular/core';

export interface ConfirmEmailStateModel {
  isConfirmed: boolean;
  error?: CustomAuthError;
}

@Injectable()
@State<ConfirmEmailStateModel>({
  name: 'confirmEmail',
  defaults: {
    isConfirmed: false,
    error: undefined
  }
})
export class ConfirmEmailState {

  public constructor(private _auth: AuthService) { }

  @Action(ConfirmEmail)
  public async confirmEmail(ctx: StateContext<ConfirmEmailStateModel>, action: ConfirmEmail): Promise<void> {
    const state = ctx.getState();
    const res: CustomResponse = await this._auth.confirmSignUp(action.email, action.code);

    ctx.setState({
      ...state,
      isConfirmed: res.success,
      error: !res.success ? res.error : undefined
    });
  }
}
