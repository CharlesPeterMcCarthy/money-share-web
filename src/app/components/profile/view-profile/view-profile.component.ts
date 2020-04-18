import { Component, Input, OnInit } from '@angular/core';
import { MyUserProfile, UserProfile } from '@moneyshare/common-types';
import { DomSanitizer, SafeStyle, Title } from '@angular/platform-browser';
import { faPencilAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { UserAPIService } from '../../../services/api/user/user.service';

@Component({
  selector: 'view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.styl']
})
export class ViewProfileComponent implements OnInit {

  @Input() public profile: MyUserProfile | UserProfile;
  @Input() public isMyProfile: boolean = false;

  public editIcon: IconDefinition = faPencilAlt;
  public avatar: SafeStyle;

  public constructor(
    private _title: Title,
    private _userApi: UserAPIService,
    private _sanitization: DomSanitizer
  ) { }

  public ngOnInit(): void {
    this.avatar = this._sanitization.bypassSecurityTrustStyle(`url(${ this.profile.avatar || './assets/images/noavatar.jpg' })`);
    this._title.setTitle(`${this.isMyProfile ? 'My Profile' : this.profile.firstName} | MoneyShare`);
  }

  public myProfile = (): MyUserProfile => this.profile as MyUserProfile;

}
