import { Component, Input } from '@angular/core';
import { User } from '@moneyshare/common-types';

@Component({
  selector: 'user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.styl']
})
export class UserItemComponent {

  @Input() public user: Partial<User>;
  @Input() public showMemberSince: boolean = false;

}
