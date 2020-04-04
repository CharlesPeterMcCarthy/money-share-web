import { State, Action, StateContext } from '@ngxs/store';
import { AuthService, CustomAuthError, CustomResponse } from '../../services/auth/auth.service';
import { AttemptLogin } from '../actions';
import { Injectable } from '@angular/core';

export interface LoginStateModel {
  isLoggedIn: boolean;
  error?: CustomAuthError;
}

@Injectable()
@State<LoginStateModel>({
  name: 'login',
  defaults: {
    isLoggedIn: false,
    error: undefined
  }
})
export class LoginState {

  public constructor(private _auth: AuthService) { }

  @Action(AttemptLogin)
  public async addAnimal(ctx: StateContext<LoginStateModel>, action: AttemptLogin): Promise<void> {
    const state = ctx.getState();
    const res: CustomResponse = await this._auth.login(action.email, action.password);

    ctx.setState({
      ...state,
      isLoggedIn: res.success,
      error: !res.success ? res.error : undefined
    });
  }
}
