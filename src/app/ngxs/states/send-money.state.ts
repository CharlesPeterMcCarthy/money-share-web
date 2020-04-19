import { State, Action, StateContext } from '@ngxs/store';
import { CustomResponse } from '../../services/auth/auth.service';
import { SendMoney } from '../actions';
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
      recipientUserId: action.recipientId
    };

    const res: CustomResponse = await this._sendMoneyApi.SendMoney(transfer);

    console.log(res);

    ctx.setState({
      ...state,
      transferComplete: res.success
    });
  }

}
