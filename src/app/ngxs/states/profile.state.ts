import { State, Action, StateContext } from '@ngxs/store';
import { CustomResponse } from '../../services/auth/auth.service';
import { EditProfile, GetMyProfile, GetOtherProfile, UpdateAvatar } from '../actions';
import { Inject, Injectable } from '@angular/core';
import { User } from '@moneyshare/common-types';
import { UserAPIService } from '../../services/api/user/user.service';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';
import { Router } from '@angular/router';

export interface ProfileStateModel {
  user?: User;
  isCurrentUser: boolean;
}

@Injectable()
@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    user: undefined,
    isCurrentUser: false
  }
})
export class ProfileState {

  public constructor(
    private _userAPI: UserAPIService,
    private _router: Router,
    @Inject(NOTYF) private _notyf: Notyf
  ) { }

  @Action(GetMyProfile)
  public async getMyProfile(ctx: StateContext<ProfileStateModel>, action: GetMyProfile): Promise<void> {
    const state = ctx.getState();
    const res: CustomResponse | void = await this._userAPI.GetUser();

    console.log(res);

    if (res && res.success) {
      ctx.setState({
        ...state,
        user: res.success ? res.user : undefined,
        isCurrentUser: true
      });
    } else {
      ctx.setState({
        ...state,
        user: undefined,
        isCurrentUser: false
      });

      this._notyf.error('Unable to Retrieve User Profile');
    }
  }

  @Action(GetOtherProfile)
  public async getOtherProfile(ctx: StateContext<ProfileStateModel>, action: GetOtherProfile): Promise<void> {
    const state = ctx.getState();
    const res: CustomResponse | void = await this._userAPI.GetOtherUser(action.userId);

    console.log(res);

    if (res) {
      ctx.setState({
        ...state,
        user: res.success ? res.user : undefined,
        isCurrentUser: false
      });
    } else {
      ctx.setState({
        ...state,
        user: undefined,
        isCurrentUser: false
      });

      this._notyf.error('Unable to Retrieve Your Profile');
    }
  }

  @Action(EditProfile)
  public async editProfile(ctx: StateContext<ProfileStateModel>, action: EditProfile): Promise<void> {
    const state = ctx.getState();
    const res: CustomResponse | void = await this._userAPI.EditProfile({ firstName: action.firstName, lastName: action.lastName });

    console.log(res);

    if (res) {
      ctx.setState({
        ...state,
        user: res.success ? res.user : undefined,
        isCurrentUser: true
      });

      this._notyf.success('Profile Successfully Updated');
      await this._router.navigateByUrl('/profile');
    } else {
      ctx.setState({
        ...state,
        isCurrentUser: false
      });

      this._notyf.error('Unable to Update Your Profile');
    }
  }

  @Action(UpdateAvatar)
  public async updateAvatar(ctx: StateContext<ProfileStateModel>, action: UpdateAvatar): Promise<void> {
    const state = ctx.getState();
    const res: CustomResponse | void = await this._userAPI.EditProfile({ avatar: action.avatar });

    console.log(res);

    if (res) {
      ctx.setState({
        ...state,
        user: res.success ? res.user : undefined,
        isCurrentUser: true
      });

      this._notyf.success('Avatar Successfully Updated');
    } else {
      ctx.setState({
        ...state,
        isCurrentUser: false
      });

      this._notyf.error('Unable to Update Your Avatar');
    }
  }

}
