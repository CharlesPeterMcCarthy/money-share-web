import { State, Action, StateContext } from '@ngxs/store';
import { CustomResponse } from '../../services/auth/auth.service';
import { GetGraphData, GetTransactionsPreview } from '../actions';
import { Injectable } from '@angular/core';
import { TransactionAPIService } from '../../services/api/transaction/transaction.service';
import { Transaction } from '@moneyshare/common-types';

export interface DashboardStateModel {
  transactions: Transaction[];
  graphData: Array<{ y: number; indexLabel: string }>;
}

@Injectable()
@State<DashboardStateModel>({
  name: 'dashboard',
  defaults: {
    transactions: [],
    graphData: []
  }
})
export class DashboardState {

  public constructor(
    private _transactionApi: TransactionAPIService
  ) { }

  @Action(GetTransactionsPreview)
  public async getTransactionsPreview(ctx: StateContext<DashboardStateModel>, action: GetTransactionsPreview): Promise<void> {
    const state = ctx.getState();
    const res: CustomResponse = await this._transactionApi.GetPreview();

    ctx.setState({
      ...state,
      transactions: res.success ? res.transactions : []
    });
  }

  @Action(GetGraphData)
  public async getGraphData(ctx: StateContext<DashboardStateModel>, action: GetGraphData): Promise<void> {
    const state = ctx.getState();
    const res: CustomResponse = await this._transactionApi.GetGraphData();

    ctx.setState({
      ...state,
      graphData: res.success ? res.data : []
    });
  }

}
