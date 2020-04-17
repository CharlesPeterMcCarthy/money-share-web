import { State, Action, StateContext } from '@ngxs/store';
import { CustomResponse } from '../../services/auth/auth.service';
import { SendMoney } from '../actions';
import { Injectable } from '@angular/core';
import { SendMoneyAPIService } from '../../services/api/send-money/send-money.service';
import { Transfer } from '@moneyshare/common-types';

export interface SendMoneyStateModel {
  transferComplete: boolean;
}

@Injectable()
@State<SendMoneyStateModel>({
  name: 'sendMoney',
  defaults: {
    transferComplete: false
  }
})
export class SendMoneyState {

  public constructor(
    private _sendMoneyApi: SendMoneyAPIService
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

}
