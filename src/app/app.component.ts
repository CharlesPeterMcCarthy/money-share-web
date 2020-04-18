import { Component, OnInit } from '@angular/core';
import { faBars, faSignOutAlt, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { AuthService } from './services/auth/auth.service';
import { environment } from '../environments/environment';
import { UserAPIService } from './services/api/user/user.service';
import { Select, Store } from '@ngxs/store';
import { UserState, UserStateModel } from './ngxs/states';
import { Observable } from 'rxjs';
import { GetUser } from './ngxs/actions';
import { User } from '@moneyshare/common-types';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MoneyBottomSheetComponent } from './components/money-bottom-sheet/money-bottom-sheet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  @Select(UserState) public userState$: Observable<any>;

  private user: User;
  public signOutIcon: IconDefinition = faSignOutAlt;
  public navIcon: IconDefinition = faBars;
  public closeNavIcon: IconDefinition = faTimes;
  public brandName: string = environment.brand;

  public constructor(
    private _title: Title,
    private _auth: AuthService,
    private _userAPI: UserAPIService,
    private _store: Store,
    private _bottomSheet: MatBottomSheet
  ) { }

  public async ngOnInit(): Promise<void> {
    this._title.setTitle(environment.brand);
    await this._auth.checkUserAuthenticated();

    this._store.dispatch(new GetUser());

    this.userState$.subscribe((userState: UserStateModel) => this.user = userState.user);
  }

  public signOut = async (): Promise<void> => {
    await this._auth.signOut();
  }

  public isLoggedIn = (): boolean => this._auth.isLoggedIn();

  public accountBalance = (): string => ((this.user && this.user.accountBalance || 0) / 100).toFixed(2);

  public moneyOptions = (): void => {
    this._bottomSheet.open(MoneyBottomSheetComponent);
  }

}
