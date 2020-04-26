import { Component, Input, OnInit } from '@angular/core';
import { Deposit, Transaction } from '@moneyshare/common-types';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faArrowRight, faEuroSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'deposit-card',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.styl']
})
export class DepositCardComponent implements OnInit {

  @Input() public deposit: Deposit;
  public euroIcon: IconDefinition = faEuroSign;
  // public arrowRightIcon: IconDefinition = faArrowRight;

  public constructor() { }

  public ngOnInit(): void { }

  // public transactionDirection = (): string => {
  //   switch (this.transaction.type) {
  //     case 'DEPOSIT':
  //     case 'RECEIVE':
  //       return 'positive';
  //     case 'WITHDRAW':
  //     case 'TRANSFER':
  //       return 'negative';
  //     default:
  //       return '';
  //   }
  // }

}
