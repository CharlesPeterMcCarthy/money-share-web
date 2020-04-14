import { Component, Inject, OnInit } from '@angular/core';
import { loadStripe, PaymentIntent, Stripe, StripeCardElement, StripeCardElementChangeEvent, StripeError } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
import { Select, Store } from '@ngxs/store';
import { DepositState, DepositStateModel } from '../../ngxs/states';
import { Observable } from 'rxjs';
import { BeginDeposit, CompleteDeposit, GetUser } from '../../ngxs/actions';
import { withLatestFrom } from 'rxjs/operators';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';
import { NgxSpinnerService } from 'ngx-spinner';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.styl']
})
export class DepositComponent implements OnInit {

  @Select(DepositState) public depositState$: Observable<any>;

  public depositForm: FormGroup;

  public stripe: Stripe;
  public card: StripeCardElement;
  public cardErrors: string;
  public amountErrors: string;
  public paymentComplete: boolean = false;
  public depositCompleteIcon: IconDefinition = faCheck;

  public constructor(
    private _store: Store,
    private _spinner: NgxSpinnerService,
    private _fb: FormBuilder,
    @Inject(NOTYF) private _notyf: Notyf
  ) { }

  public async ngOnInit(): Promise<void> {
    this.depositForm = this._fb.group({
      amount: [ 10, [
        Validators.required,
        Validators.pattern('^(?!0\\.00)\\d{1,3}(,\\d{3})*(\\.\\d\\d)?$'),
        Validators.max(500),
        Validators.min(10)
      ] ]
    });

    this.stripe = await loadStripe(environment.stripeAPIKey);

    const style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    const elements = this.stripe.elements();

    this.card = elements.create('card', { style });
    this.card.mount('#card-element');

    this.card.on('change', (event: StripeCardElementChangeEvent) => {
      this.cardErrors = event.error ? event.error.message : '';
    });
  }

  public get amount(): AbstractControl { return this.depositForm.get('amount'); }

  public submit = async (): Promise<void> => {
    await this._spinner.show('spinner');
    this.cardErrors = '';

    const amount: number = this.amount.value * 100; // Convert to cent
    if (amount < 1000 || amount > 50000) return;

    this._store
      .dispatch(new BeginDeposit(amount))
      .pipe(withLatestFrom(this.depositState$))
      .subscribe(([ _, deposit ]: DepositStateModel[]) => {
        this.stripe.confirmCardPayment(deposit.clientSecret, {
          payment_method: {
            card: this.card
          }
        }).then(async (result: { paymentIntent: PaymentIntent; error: StripeError }) => {
          await this._spinner.hide('spinner');

          if (result.error) {
            this._notyf.error(result.error.message);
            this.cardErrors = result.error.message;
          } else if (result.paymentIntent.status === 'succeeded') {
            this.completeDeposit();
          }
        });
      });
  }

  private completeDeposit = (): void => {
    this._store
      .dispatch(new CompleteDeposit())
      .pipe(withLatestFrom(this.depositState$))
      .subscribe(([ _, deposit ]: DepositStateModel[]) => {
        this._notyf.success('Balance Successfully Updated!');
        this.paymentComplete = true;

        this._store.dispatch(new GetUser()); // Update balance on header bar
      });
  }

}
