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
import { GetUser, RecipientSearch, SendMoney } from '../../ngxs/actions';
import { withLatestFrom } from 'rxjs/operators';
import { User } from '@moneyshare/common-types';

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.styl']
})
export class SendMoneyComponent implements OnInit {

  @Select(SendMoneyState) public sendMoneyState$: Observable<any>;
  @Select(State => State.sendMoney.transferComplete) public transferComplete$: Observable<boolean>;
  @Select(State => State.sendMoney.matchingUsers) public matchingUsers$: Observable<Array<Partial<User>>>;

  public sendMoneyForm: FormGroup;
  public amountErrors: string;
  public transferCompleteIcon: IconDefinition = faCheck;

  public constructor(
    private _store: Store,
    private _spinner: NgxSpinnerService,
    private _fb: FormBuilder,
    @Inject(NOTYF) private _notyf: Notyf
  ) { }

  public ngOnInit(): void {
    this.sendMoneyForm = this._fb.group({
      amount: [ 10, [
        Validators.required,
        Validators.pattern('^(?!0\\.00)\\d{1,3}(,\\d{3})*(\\.\\d\\d)?$'),
        Validators.min(1)
      ] ],
      recipientSearch: [ ],
      message: []
    });

    this.searchForRecipientsListener();
  }

  public get amount(): AbstractControl { return this.sendMoneyForm.get('amount'); }
  public get recipientSearch(): AbstractControl { return this.sendMoneyForm.get('recipientSearch'); }
  public get message(): AbstractControl { return this.sendMoneyForm.get('message'); }

  private searchForRecipientsListener = (): void => {
    this.recipientSearch.valueChanges.subscribe((search: string) => {
      this._store.dispatch(new RecipientSearch(search));
    });
  }

  public submit = async (): Promise<void> => {
    await this._spinner.show('spinner');

    const amount: number = this.amount.value * 100; // Convert to cent
    if (amount < 100) return;

    this._store
      .dispatch(new SendMoney(amount))
      .pipe(withLatestFrom(this.sendMoneyState$))
      .subscribe(async ([ _, sendMoney ]: SendMoneyStateModel[]) => {
        console.log(_);
        console.log(sendMoney);

        await this._spinner.hide('spinner');

        this._store.dispatch(new GetUser()); // Update balance on header bar
      });
  }

}
