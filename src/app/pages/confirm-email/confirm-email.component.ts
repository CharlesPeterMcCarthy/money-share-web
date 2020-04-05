import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, CustomAuthError, CustomResponse } from '../../services/auth/auth.service';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmEmail } from '../../ngxs/actions';
import { withLatestFrom } from 'rxjs/operators';
import { ConfirmEmailState, ConfirmEmailStateModel } from '../../ngxs/states';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.styl']
})
export class ConfirmEmailComponent implements OnInit {

  @Select(ConfirmEmailState) public confirmEmailState$: Observable<any>;

  private readonly confirmationCode: string;
  private readonly email: string;
  public isConfirmed: boolean = false;
  public isConfirming: boolean = false;
  public error: string;
  public requestedCode: boolean = false;
  private knownErrorTypes: string[] = [
    'CodeMismatchException',
    'NotAuthorizedException',
    'ExpiredCodeException',
    'LimitExceededException'
  ];

  public constructor(
    private _title: Title,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService,
    private _spinner: NgxSpinnerService,
    private _store: Store,
    @Inject(NOTYF) private _notyf: Notyf
  ) {
    this._title.setTitle(`Confirm Email | ${environment.brand}`);
    this.confirmationCode = this._route.snapshot.paramMap.get('code');
    this.email = this._route.snapshot.paramMap.get('email');
  }

  public async ngOnInit(): Promise<void> {
    await this.checkConfirmationCode();
  }

  private isKnownError = (code: string): boolean => this.knownErrorTypes.indexOf(code) > -1;

  private checkConfirmationCode = async (): Promise<void> => {
    this.isConfirming = true;
    await this._spinner.show('confirming');

    this._store
      .dispatch(new ConfirmEmail(this.email, this.confirmationCode))
      .pipe(withLatestFrom(this.confirmEmailState$))
      .subscribe(async ([ _, confirmEmail ]: ConfirmEmailStateModel[]) => {
        if (confirmEmail.isConfirmed) {
          this.isConfirmed = true;
          this.isConfirming = false;
          this._notyf.success('You have successfully confirmed your account');
          await this._router.navigateByUrl('login', { state: { email: this.email } });
        } else if (confirmEmail.error) {
          this.isConfirming = false;
          this.handleError(confirmEmail.error);
        }

        await this._spinner.hide('spinner');
      });

    await this._spinner.hide('confirming');
  }

  private handleError = (err: CustomAuthError): void => {
    if (this.isKnownError(err.code)) this.error = err.code;
    else this._notyf.error('An unknown error has occurred');
  }

  public requestNewCode = async (): Promise<void> => {
    await this._spinner.show('requesting');
    // const res: boolean = await this._authService.requestNewCode(this.username);
    // this.requestedCode = res;
    await this._spinner.hide('requesting');
  }

}
