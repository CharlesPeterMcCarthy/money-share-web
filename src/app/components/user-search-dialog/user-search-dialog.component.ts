import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClearData, ClearResults, ResetUser, SelectUser, UserSearch } from '../../ngxs/actions';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from '@moneyshare/common-types';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

export interface DialogData {
  user: User;
}

@Component({
  selector: 'app-user-search-dialog',
  templateUrl: './user-search-dialog.component.html',
  styleUrls: ['./user-search-dialog.component.styl']
})
export class UserSearchDialogComponent implements OnInit {

  @Select(State => State.userSearchDialog.matchingUsers) public matchingUsers$: Observable<Array<Partial<User>>>;
  @Select(State => State.userSearchDialog.selectedUser) public selectedUser$: Observable<Partial<User>>;
  @Select(State => State.userSearchDialog.searchText) public searchText$: Observable<string>;
  @Select(State => State.userSearchDialog.isSearching) public isSearching$: Observable<boolean>;

  public editIcon: IconDefinition = faPencilAlt;
  private searchText: string;
  private debounceSearch: () => void = _.debounce(() => this._store.dispatch(new UserSearch(this.searchText)), 400);

  public constructor(
    private _store: Store,
    public dialogRef: MatDialogRef<UserSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  public ngOnInit(): void {
    this.dialogRef.afterClosed().subscribe(() => {
      this._store.dispatch(new ClearData());
    });
  }

  public close = (): void => {
    this.dialogRef.close();
  }

  public searchForUsers = (searchText: string): void => {
    if (searchText) {
      this.searchText = searchText;
      this.debounceSearch();
    } else this._store.dispatch(new ClearResults());
  }

  public selectUser = (user: User): void => {
    this.data.user = user;
    this._store.dispatch(new SelectUser(user));
  }

  public reset = (): void => {
    this._store.dispatch(new ResetUser());
  }

}
