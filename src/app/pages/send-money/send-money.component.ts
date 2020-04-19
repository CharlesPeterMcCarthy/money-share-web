import { Component, Inject, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SendMoneyState, SendMoneyStateModel } from '../../ngxs/states';
import { Observable } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';
import { GetUser, SendMoney } from '../../ngxs/actions';
import { withLatestFrom } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { UserSearchDialogComponent } from '../../components/user-search-dialog/user-search-dialog.component';
import { User, UserBrief } from '@moneyshare/common-types';

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.styl']
})
export class SendMoneyComponent implements OnInit {

  @Select(SendMoneyState) public sendMoneyState$: Observable<any>;
  @Select(State => State.sendMoney.transferComplete) public transferComplete$: Observable<boolean>;
  @Select(State => State.user.user) public currentUser$: Observable<User>;

  public amountForm: FormGroup;
  public messageForm: FormGroup;
  public recipientForm: FormGroup;
  public transferCompleteIcon: IconDefinition = faCheck;

  public constructor(
    private _store: Store,
    private _spinner: NgxSpinnerService,
    private _fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(NOTYF) private _notyf: Notyf
  ) { }

  public ngOnInit(): void {
    this.amountForm = this._fb.group({
      amount: [ 10, [
        Validators.required,
        Validators.pattern('^(?!0\\.00)\\d{1,3}(,\\d{3})*(\\.\\d\\d)?$'),
        Validators.min(1)
      ] ]
    });

    this.recipientForm = this._fb.group({
      recipient: [ '', Validators.required ]
    });

    this.messageForm = this._fb.group({
      message: [ '', Validators.required ]
    });
  }

  public get amount(): AbstractControl { return this.amountForm.get('amount'); }
  public get message(): AbstractControl { return this.messageForm.get('message'); }
  public get recipient(): AbstractControl { return this.recipientForm.get('recipient'); }
  public get recipientUser(): User { return this.recipient.value; }

  public openRecipientSearchDialog = (): void => {
    const dialogRef = this.dialog.open(UserSearchDialogComponent, {
      width: '80%',
      maxWidth: '800px',
      data: { user: this.recipient }
    });

    dialogRef.afterClosed().subscribe((recipient: { user: User }) => {
      if (recipient && recipient.user) this.recipient.setValue(recipient.user);
    });
  }

  public selectRecipient = (user: UserBrief): void => {
    this.recipient.setValue(user);
  }

  public resetRecipient = (): void => {
    this.recipient.setValue('');
  }

  public submit = async (): Promise<void> => {
    await this._spinner.show('spinner');

    const amount: number = this.amount.value * 100; // Convert to cent
    if (amount < 100) return;
    if (!this.recipient.value) return;

    this._store
      .dispatch(new SendMoney(amount, this.recipient.value.userId))
      .pipe(withLatestFrom(this.sendMoneyState$))
      .subscribe(async ([ _, sendMoney ]: SendMoneyStateModel[]) => {
        console.log(_);
        console.log(sendMoney);

        await this._spinner.hide('spinner');

        this._store.dispatch(new GetUser()); // Update balance on header bar
      });
  }

}
