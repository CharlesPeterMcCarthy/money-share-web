import { Component, Input, OnInit } from '@angular/core';
import { MyUserProfile, User } from '@moneyshare/common-types';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { MoneyBottomSheetComponent } from '../money-bottom-sheet/money-bottom-sheet.component';

@Component({
  selector: 'user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.styl']
})
export class UserItemComponent implements OnInit {

  @Input() public user: Partial<User>;
  @Input() public showMemberSince: boolean = false;
  public avatar: SafeStyle;

  public constructor(
    private _sanitization: DomSanitizer
  ) { }

  public ngOnInit(): void {
    this.setAvatar(this.user.avatar);
  }

  private setAvatar = (avatar: string): SafeStyle => this.avatar =
    this._sanitization.bypassSecurityTrustStyle(`url(${ avatar || './assets/images/noavatar.jpg' })`);

}
