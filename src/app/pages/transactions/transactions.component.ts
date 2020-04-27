import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetAllTransactions } from '../../ngxs/actions';
import { Transaction } from '@moneyshare/common-types';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.styl']
})
export class TransactionsComponent implements OnInit {

  @Select((State) => State.transaction.transactions) public transactions$: Observable<Transaction[]>;
  @Select((State) => State.transaction.canLoadMore) public canLoadMore$: Observable<boolean>;

  public constructor(
    private _store: Store,
    private _spinner: NgxSpinnerService
  ) { }

  public async ngOnInit(): Promise<void> {
    console.log('get');
    await this._spinner.show('spinner');
    this._store.dispatch(new GetAllTransactions(true)).subscribe(async () => {
      await this._spinner.hide('spinner');
    });
  }

  public loadMore = async (): Promise<void> => {
    await this._spinner.show('spinner');
    this._store.dispatch(new GetAllTransactions(false)).subscribe(async () => {
      await this._spinner.hide('spinner');
    });
  }

}
