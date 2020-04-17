import { State, Action, StateContext } from '@ngxs/store';
import { CustomResponse } from '../../services/auth/auth.service';
import { BeginDeposit, CompleteDeposit } from '../actions';
import { Injectable } from '@angular/core';
import { DepositAPIService } from '../../services/api/deposit/deposit.service';

export interface DepositStateModel {
  clientSecret?: string;
  paymentComplete: boolean;
}

@Injectable()
@State<DepositStateModel>({
  name: 'deposit',
  defaults: {
    clientSecret: undefined,
    paymentComplete: false
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

    ctx.setState({
      ...state,
      paymentComplete: !!res.success,
      clientSecret: undefined
    });
  }

}
