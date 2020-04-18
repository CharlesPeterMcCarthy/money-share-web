import { State, Action, StateContext } from '@ngxs/store';
import { CustomResponse } from '../../services/auth/auth.service';
import { GetUser } from '../actions';
import { Injectable } from '@angular/core';
import { User } from '@moneyshare/common-types';
import { UserAPIService } from '../../services/api/user/user.service';

export interface UserStateModel {
  user?: User;
}

@Injectable()
@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: undefined
  }
})
export class UserState {

  public constructor(private _userAPI: UserAPIService) { }

  @Action(GetUser)
  public async getUser(ctx: StateContext<UserStateModel>, action: GetUser): Promise<void> {
    const state = ctx.getState();
    const res: CustomResponse | void = await this._userAPI.GetUser();

    console.log(res);

    if (res) ctx.setState({
      ...state,
      user: res.success ? res.user : undefined
    });
  }

}
