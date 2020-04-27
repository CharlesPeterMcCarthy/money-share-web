import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faEuroSign, faArrowRight, faCommentDollar } from '@fortawesome/free-solid-svg-icons';
import { Transaction } from '@moneyshare/common-types';

@Component({
  selector: 'transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.styl']
})
export class TransactionComponent {

  @Input() public transaction: Transaction;
  public euroIcon: IconDefinition = faEuroSign;
  public arrowRightIcon: IconDefinition = faArrowRight;
  public messageIcon: IconDefinition = faCommentDollar;

  public transactionDirection = (): string => {
    switch (this.transaction.type) {
      case 'DEPOSIT':
      case 'RECEIVE':
        return 'positive';
      case 'WITHDRAW':
      case 'TRANSFER':
        return 'negative';
      default:
        return '';
    }
  }

}
