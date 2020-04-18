import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faMoneyBill, faCreditCard, faCommentDollar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'money-bottom-sheet',
  templateUrl: './money-bottom-sheet.component.html',
  styleUrls: ['./money-bottom-sheet.component.styl']
})
export class MoneyBottomSheetComponent {

  @Select(State => State.user.user.accountBalance) public accountBalance$: Observable<any>;

  public withdrawIcon: IconDefinition = faMoneyBill;
  public depositIcon: IconDefinition = faCreditCard;
  public sendMoneyIcon: IconDefinition = faCommentDollar;

  public constructor(
    private _bottomSheetRef: MatBottomSheetRef<MoneyBottomSheetComponent>
  ) { }

  public dismiss = (event: MouseEvent): void => {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
