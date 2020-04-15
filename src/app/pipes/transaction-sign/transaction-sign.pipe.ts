import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionSign'
})
export class TransactionSignPipe implements PipeTransform {

  public transform(transactionType: string): string {
    switch (transactionType) {
      case 'DEPOSIT':
      case 'RECEIVE':
        return '+';
      case 'WITHDRAW':
      case 'SEND':
        return '-';
      default:
        return '';
    }
  }

}
