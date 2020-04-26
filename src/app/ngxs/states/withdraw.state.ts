import { State, Action, StateContext } from '@ngxs/store';
import { CustomResponse } from '../../services/auth/auth.service';
import { GetWithdrawals, ResetWithdrawForm, WithdrawMoney } from '../actions';
import { Injectable } from '@angular/core';
import { WithdrawAPIService } from '../../services/api/withdraw/withdraw.service';
import { LastEvaluatedKey, Withdrawal } from '@moneyshare/common-types';

export interface WithdrawStateModel {
  withdrawComplete: boolean;
  withdrawals: Withdrawal[];
  lastEvaluatedKey?: LastEvaluatedKey;
  canLoadMore: boolean;
}

const initialState: WithdrawStateModel = {
  withdrawComplete: false,
  withdrawals: [],
  canLoadMore: false
};

@Injectable()
@State<WithdrawStateModel>({
  name: 'withdraw',
  defaults: initialState
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
      ...state,
      withdrawComplete: res.success
    });
  }

  @Action(GetWithdrawals)
  public async getWithdrawals(ctx: StateContext<WithdrawStateModel>, action: GetWithdrawals): Promise<void> {
    const state = ctx.getState();
    const res: CustomResponse = await this._withdrawApi.GetAll(action.isFirstLoad ?  undefined : state.lastEvaluatedKey);

    console.log(res);
    ctx.setState({
      ...state,
      withdrawals: action.isFirstLoad ? res.withdrawals : [ ...state.withdrawals, ...res.withdrawals ],
      lastEvaluatedKey: res.lastEvaluatedKey,
      canLoadMore: !!res.lastEvaluatedKey
    });
  }

  @Action(ResetWithdrawForm)
  public resetDepositForm(ctx: StateContext<WithdrawStateModel>, action: ResetWithdrawForm): void {
    const state = ctx.getState();

    ctx.setState({
      ...initialState,
      withdrawals: state.withdrawals
    });
  }

}
