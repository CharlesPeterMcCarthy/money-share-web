import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService, CustomAuthError } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';
import { faSignInAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Select, Store } from '@ngxs/store';
import { AttemptLogin } from '../../ngxs/actions';
import { Observable } from 'rxjs';
import { LoginState, LoginStateModel } from '../../ngxs/states';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  @Select(LoginState) public loginState$: Observable<any>;

  public loginForm: FormGroup;
  public loginIcon: IconDefinition = faSignInAlt;

  private emailErrorTypes: string[] = [
    'UserNotFoundException',
    'UserNotConfirmedException'
  ];
  private passwordErrorTypes: string[] = [
    'NotAuthorizedException'
  ];

  public constructor(
    private _title: Title,
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private _location: Location,
    private _spinner: NgxSpinnerService,
    private _store: Store,
    @Inject(NOTYF) private _notyf: Notyf
  ) {
    this._title.setTitle('Login | MoneyShare');
  }

  public ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required ] ]
    });

    const state: { [k: string]: any } = this._location.getState();
    if (state.email) this.email.setValue(state.email); // Value passed from confirm email page
  }

  public get email(): AbstractControl { return this.loginForm.get('email'); }
  public get password(): AbstractControl { return this.loginForm.get('password'); }

  private isEmailError = (code: string): boolean => this.emailErrorTypes.indexOf(code) > -1;
  private isPasswordError = (code: string): boolean => this.passwordErrorTypes.indexOf(code) > -1;

  public login = async (): Promise<void> => {
    await this._spinner.show('spinner');

    this._store
      .dispatch(new AttemptLogin(this.email.value.trim(), this.password.value.trim()))
      .pipe(withLatestFrom(this.loginState$))
      .subscribe(async ([ _, login ]: LoginStateModel[]) => {
        if (login.isLoggedIn) await this._router.navigate([ '/' ]); // Update when dashboard is created
        else if (login.error) this.handleError(login.error);

        await this._spinner.hide('spinner');
      });
  }

  private handleError = (err: CustomAuthError): void => {
    if (this.isEmailError(err.code)) this.email.setErrors({ [err.code]: true });
    else if (this.isPasswordError(err.code)) this.password.setErrors({ [err.code]: true });
    else this._notyf.error('An unknown error has occurred');
  }

}
