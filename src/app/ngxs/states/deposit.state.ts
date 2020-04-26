import { State, Action, StateContext } from '@ngxs/store';
import { CustomResponse } from '../../services/auth/auth.service';
import { BeginDeposit, CompleteDeposit, GetDeposits } from '../actions';
import { Injectable } from '@angular/core';
import { DepositAPIService } from '../../services/api/deposit/deposit.service';
import { Deposit, LastEvaluatedKey } from '@moneyshare/common-types';

export interface DepositStateModel {
  clientSecret?: string;
  paymentComplete: boolean;
  lastEvaluatedKey?: LastEvaluatedKey;
  deposits: Deposit[];
  canLoadMore: boolean;
}

@Injectable()
@State<DepositStateModel>({
  name: 'deposit',
  defaults: {
    clientSecret: undefined,
    paymentComplete: false,
    deposits: [],
    canLoadMore: false
  }
})
export class DepositState {

  public constructor(
    private _depositApi: DepositAPIService
  ) { }

  @Action(BeginDeposit)
  public async beginDeposit(ctx: StateContext<DepositStateModel>, action: BeginDeposit): Promise<void> {
    const state = ctx.getState();
    const res: CustomResponse = await this._depositApi.BeginDeposit(action.amount);

    ctx.setState({
      ...state,
      clientSecret: res.clientSecret
    });
  }

  @Action(CompleteDeposit)
  public async completeDeposit(ctx: StateContext<DepositStateModel>, action: CompleteDeposit): Promise<void> {
    const state = ctx.getState();
    const res: CustomResponse = await this._depositApi.CompleteDeposit(ctx.getState().clientSecret);

    console.log(res);

    ctx.setState({
      ...state,
      paymentComplete: res.success,
      clientSecret: undefined
    });
  }

  @Action(GetDeposits)
  public async getDeposits(ctx: StateContext<DepositStateModel>, action: GetDeposits): Promise<void> {
    const state = ctx.getState();
    const res: CustomResponse = await this._depositApi.GetAll(action.isFirstLoad ?  undefined : state.lastEvaluatedKey);

    console.log(res);
    ctx.setState({
      ...state,
      deposits: action.isFirstLoad ? res.deposits : [ ...state.deposits, ...res.deposits ],
      lastEvaluatedKey: res.lastEvaluatedKey,
      canLoadMore: !!res.lastEvaluatedKey
    });
  }

}
