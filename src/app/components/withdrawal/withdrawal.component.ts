import { Component, Input } from '@angular/core';
import { Withdrawal } from '@moneyshare/common-types';

@Component({
  selector: 'withdraw-card',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.styl']
})
export class WithdrawalCardComponent {

  @Input() public withdraw: Withdrawal;

}
