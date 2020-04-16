import { State, Action, StateContext } from '@ngxs/store';
import { CustomResponse } from '../../services/auth/auth.service';
import { GetAllTransactions } from '../actions';
import { Injectable } from '@angular/core';
import { Transaction } from '@moneyshare/common-types';
import { TransactionAPIService } from '../../services/api/transaction/transaction.service';
import { LastEvaluatedKey } from '@moneyshare/common-types/lib/interfaces/responses';

export interface TransactionStateModel {
  transactions: Transaction[];
  lastEvaluatedKey?: LastEvaluatedKey;
  canLoadMore: boolean;
}

@Injectable()
@State<TransactionStateModel>({
  name: 'transaction',
  defaults: {
    transactions: [],
    canLoadMore: false
  }
})
export class TransactionState {

  public constructor(
    private _transactionApi: TransactionAPIService
  ) { }

  @Action(GetAllTransactions)
  public async getAllTransactions(ctx: StateContext<TransactionStateModel>, action: GetAllTransactions): Promise<void> {
    const state = ctx.getState();
    const res: CustomResponse = await this._transactionApi.GetAll(action.isFirstLoad ?  undefined : state.lastEvaluatedKey);

    ctx.setState({
      ...state,
      transactions: action.isFirstLoad ? res.transactions : [ ...state.transactions, ...res.transactions ],
      lastEvaluatedKey: res.lastEvaluatedKey,
      canLoadMore: !!res.lastEvaluatedKey
    });
  }

}
