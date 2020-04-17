import { Component, Inject, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';
import { GetUser, WithdrawMoney } from '../../ngxs/actions';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.styl']
})
export class WithdrawComponent implements OnInit {

  @Select(State => State.withdraw.withdrawComplete) public withdrawComplete$: Observable<boolean>;

  public withdrawForm: FormGroup;
  public amountErrors: string;
  public withdrawCompleteIcon: IconDefinition = faCheck;

  public constructor(
    private _store: Store,
    private _spinner: NgxSpinnerService,
    private _fb: FormBuilder,
    @Inject(NOTYF) private _notyf: Notyf
  ) { }

  public ngOnInit(): void {
    this.withdrawForm = this._fb.group({
      amount: [ 10, [
        Validators.required,
        Validators.pattern('^(?!0\\.00)\\d{1,3}(,\\d{3})*(\\.\\d\\d)?$'),
        Validators.max(350),
        Validators.min(5)
      ] ]
    });
  }

  public get amount(): AbstractControl { return this.withdrawForm.get('amount'); }

  public submit = async (): Promise<void> => {
    await this._spinner.show('spinner');

    const amount: number = this.amount.value * 100; // Convert to cent
    if (amount < 1000 || amount > 50000) return;

    this._store.dispatch(new WithdrawMoney(amount)).subscribe(async () => {
      await this._spinner.hide('spinner');
      this._store.dispatch(new GetUser()); // Update balance on header bar
    });
  }

}
