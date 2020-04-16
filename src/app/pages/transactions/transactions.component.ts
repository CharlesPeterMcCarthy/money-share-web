import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetAllTransactions } from '../../ngxs/actions';
import { Transaction } from '@moneyshare/common-types';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.styl']
})
export class TransactionsComponent implements OnInit {

  @Select((State) => State.transaction.transactions) public transactions$: Observable<Transaction[]>;
  @Select((State) => State.transaction.canLoadMore) public canLoadMore$: Observable<boolean>;
  @Dispatch() private getAllTransactions = (isFirstLoad: boolean): GetAllTransactions => new GetAllTransactions(isFirstLoad);

  public constructor(
    private _store: Store
  ) { }

  public ngOnInit(): void {
    this.getAllTransactions(true);
  }

  public loadMore = (): void => {
    this.getAllTransactions(false);
  }

}
