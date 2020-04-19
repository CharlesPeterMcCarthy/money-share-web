import { State, Action, StateContext } from '@ngxs/store';
import { CustomResponse } from '../../services/auth/auth.service';
import { RecipientSearch, SendMoney } from '../actions';
import { Injectable } from '@angular/core';
import { SendMoneyAPIService } from '../../services/api/send-money/send-money.service';
import { Transfer, User } from '@moneyshare/common-types';
import { UserAPIService } from '../../services/api/user/user.service';

export interface SendMoneyStateModel {
  transferComplete: boolean;
  matchingUsers: Array<Partial<User>>;
}

@Injectable()
@State<SendMoneyStateModel>({
  name: 'sendMoney',
  defaults: {
    transferComplete: false,
    matchingUsers: []
  }
})
export class SendMoneyState {

  public constructor(
    private _sendMoneyApi: SendMoneyAPIService,
    private _userApi: UserAPIService
  ) { }

  @Action(SendMoney)
  public async sendMoney(ctx: StateContext<SendMoneyStateModel>, action: SendMoney): Promise<void> {
    const state = ctx.getState();

    const transfer: Partial<Transfer> = {
      amount: action.amount,
      message: 'test',
      recipientUserId: '156b3474-19c7-4b9b-bf36-bbd2752d7389'
    };

    const res: CustomResponse = await this._sendMoneyApi.SendMoney(transfer);

    console.log(res);

    ctx.setState({
      ...state,
      transferComplete: res.success
    });
  }

  @Action(RecipientSearch)
  public async recipientSearch(ctx: StateContext<SendMoneyStateModel>, action: RecipientSearch): Promise<void> {
    const state = ctx.getState();

    const res: CustomResponse = await this._userApi.UserSearch(action.searchText);

    console.log(res);

    ctx.setState({
      ...state,
      matchingUsers: res.users
    });
  }

}
