import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MyUserProfile, User, UserProfile } from '@moneyshare/common-types';
import { UserAPIService } from '../../services/api/user/user.service';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';
import { GetMyProfile, GetOtherProfile } from '../../ngxs/actions';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.styl']
})
export class ProfileComponent implements OnInit {

  @Select(State => State.profile.user) public profile$: Observable<MyUserProfile | UserProfile>;

  public isMyProfile: boolean = false;
  public editProfile: boolean = false;

  public constructor(
    private _title: Title,
    private route: ActivatedRoute,
    private _userApi: UserAPIService,
    private _spinner: NgxSpinnerService,
    private _store: Store,
    @Inject(NOTYF) private _notyf: Notyf
  ) { }

  public async ngOnInit(): Promise<void> {
    const userId: string = this.route.snapshot.paramMap.get('userId');

    if (this.route.snapshot.routeConfig.path === 'profile/edit') this.editProfile = true;

    this.isMyProfile = !userId;

    await this._spinner.show('spinner');

    if (userId) this._store.dispatch(new GetOtherProfile(userId)).subscribe(() => this._spinner.hide('spinner'));
    else this._store.dispatch(new GetMyProfile()).subscribe(() => this._spinner.hide('spinner'));
  }

}
