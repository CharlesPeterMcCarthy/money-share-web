import { State, Action, StateContext } from '@ngxs/store';
import { CustomResponse } from '../../services/auth/auth.service';
import { ClearData, ClearResults, ResetUser, SelectUser, UserSearch } from '../actions';
import { Injectable } from '@angular/core';
import { User } from '@moneyshare/common-types';
import { UserAPIService } from '../../services/api/user/user.service';

export interface UserSearchDialogStateModel {
  matchingUsers: Array<Partial<User>>;
  selectedUser?: Partial<User>;
  searchText: string;
  isSearching: boolean;
}

const initialState: UserSearchDialogStateModel = {
  matchingUsers: [],
  searchText: '',
  isSearching: false
};

@Injectable()
@State<UserSearchDialogStateModel>({
  name: 'userSearchDialog',
  defaults: initialState
})
export class UserSearchDialogState {

  public constructor(
    private _userApi: UserAPIService
  ) { }

  @Action(UserSearch)
  public async userSearch(ctx: StateContext<UserSearchDialogStateModel>, action: UserSearch): Promise<void> {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      isSearching: true
    });

    const res: CustomResponse = await this._userApi.UserSearch(action.searchText);

    console.log(res);

    ctx.setState({
      ...state,
      matchingUsers: res.users,
      searchText: action.searchText,
      isSearching: false
    });
  }

  @Action(SelectUser)
  public selectUser(ctx: StateContext<UserSearchDialogStateModel>, action: SelectUser): void {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      selectedUser: action.user
    });
  }

  @Action(ResetUser)
  public resetUser(ctx: StateContext<UserSearchDialogStateModel>, action: ResetUser): void {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      selectedUser: undefined
    });
  }

  @Action(ClearData)
  public clearData(ctx: StateContext<UserSearchDialogStateModel>, action: ClearData): void {
    ctx.setState(initialState);
  }

  @Action(ClearResults)
  public clearResults(ctx: StateContext<UserSearchDialogStateModel>, action: ClearResults): void {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      matchingUsers: []
    });
  }

}
