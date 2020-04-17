import { State, Action, StateContext } from '@ngxs/store';
import { CustomResponse } from '../../services/auth/auth.service';
import { WithdrawMoney } from '../actions';
import { Injectable } from '@angular/core';
import { WithdrawAPIService } from '../../services/api/withdraw/withdraw.service';

export interface WithdrawStateModel {
  withdrawComplete: boolean;
}

@Injectable()
@State<WithdrawStateModel>({
  name: 'withdraw',
  defaults: {
    withdrawComplete: false
  }
})
export class WithdrawState {

  public constructor(
    private _withdrawApi: WithdrawAPIService
  ) { }

  @Action(WithdrawMoney)
  public async withdrawMoney(ctx: StateContext<WithdrawStateModel>, action: WithdrawMoney): Promise<void> {
    const state = ctx.getState();
    const res: CustomResponse = await this._withdrawApi.WithdrawMoney(action.amount);

    console.log(res);

    ctx.setState({
      ...state
      // clientSecret: res.clientSecret
    });
  }

}
