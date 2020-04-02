import { Component, Inject, OnInit } from '@angular/core';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { faUserPlus, faCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { AuthService, CustomAuthError, SignUpData } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.styl']
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup;
  public signUpComplete: boolean = false;
  public signUpIcon: IconDefinition = faUserPlus;
  public signUpCompleteIcon: IconDefinition = faCheck;
  private emailErrorTypes: string[] = [ 'InvalidEmailException' ];
  private passwordErrorTypes: string[] = [ 'InvalidPasswordException' ];
  private userNameErrorTypes: string[] = [ 'UsernameExistsException', 'InvalidUsernameException' ];

  public constructor(
    @Inject(NOTYF) private _notyf: Notyf,
    private fb: FormBuilder,
    private _spinner: NgxSpinnerService,
    private _title: Title,
    private _auth: AuthService
  ) {
    this._title.setTitle('Sign Up | MoneyShare');
  }

  public ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: [ '', [Validators.required, Validators.email ] ],
      firstName: [ '', [Validators.required ] ],
      lastName: [ '', [Validators.required ] ],
      password: [ '', [Validators.required ] ],
      confirmPassword: [ '', [Validators.required ] ]
    });

    this.signUpForm.valueChanges.subscribe((fields: { [key: string]: any }) => {
      // Ensure password & confirm password values match
      if (fields.password !== fields.confirmPassword) this.confirmPassword.setErrors({ PasswordMismatch: true });
    });
  }

  public get email(): AbstractControl { return this.signUpForm.get('email'); }
  public get firstName(): AbstractControl { return this.signUpForm.get('firstName'); }
  public get lastName(): AbstractControl { return this.signUpForm.get('lastName'); }
  public get password(): AbstractControl { return this.signUpForm.get('password'); }
  public get confirmPassword(): AbstractControl { return this.signUpForm.get('confirmPassword'); }

  public onSubmit = async (): Promise<void> => {
    await this._spinner.show('spinner');

    const signUpData: SignUpData = {
      firstName: this.firstName.value.trim(),
      lastName: this.lastName.value.trim(),
      email: this.email.value.trim(),
      password: this.password.value.trim()
    };

    try {
      this._validateSignUpData(signUpData);
    } catch (e) {
      await this._spinner.hide('spinner');
      return this._notyf.error(e.message);
    }

    const res = await this._auth.signUp(signUpData);

    if (res.success) this.signUpComplete = true;
    else this.handleError(res.error);

    await this._spinner.hide('spinner');
  }

  private _validateSignUpData = (signUpData: SignUpData): void => {
    if (!signUpData.firstName) throw Error('First name is missing');
    if (!signUpData.lastName) throw Error('Last name is missing');
    if (!signUpData.email) throw Error('Email Address is missing');
    if (!signUpData.password) throw Error('Password is missing');
  }

  private handleError = (err: CustomAuthError): void => {
    if (this.isPasswordError(err.code)) this.password.setErrors({ [err.code]: true });
    else if (this.isUsernameError(err.code)) this.email.setErrors({ [err.code]: true });
    else if (this.isEmailError(err.code)) this.email.setErrors({ [err.code]: true });
    else this._notyf.error('An unknown error has occurred');
  }

  private isUsernameError = (code: string): boolean => this.userNameErrorTypes.indexOf(code) > -1;
  private isEmailError = (code: string): boolean => this.emailErrorTypes.indexOf(code) > -1;
  private isPasswordError = (code: string): boolean => this.passwordErrorTypes.indexOf(code) > -1;

}
