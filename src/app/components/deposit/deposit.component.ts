import { Component, Input } from '@angular/core';
import { Deposit } from '@moneyshare/common-types';

@Component({
  selector: 'deposit-card',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.styl']
})
export class DepositCardComponent {

  @Input() public deposit: Deposit;

}
