import { Inject, Injectable } from '@angular/core';
import { AuthClass } from 'aws-amplify';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthState } from 'aws-amplify-angular/src/providers/auth.state';
import { UtilsService } from '../utils/utils.service';

export interface CustomAuthError {
  code: string;
  message: string;
  name: string;
}

export interface CustomResponse {
  error?: CustomAuthError;
  [key: string]: any;
  success: boolean;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private Auth: AuthClass = this._amplifyService.auth();
  // public user: CognitoUser;

  public constructor(
    private _amplifyService: AmplifyService,
    private _uilts: UtilsService,
    @Inject(NOTYF) private notyf: Notyf
  ) {
    this._amplifyService.authStateChange$ // Listening for auth state changes
      .subscribe((authState: AuthState) => {

        console.log(authState);
          // if (authState.user) this.user = authState.user;
          // this.setLoggedInState(authState.state === 'signedIn' && authState.user);
        }
      );
  }

  public checkUserAuthenticated = async (): Promise<void> => { // Called when the app first loads
    try {
      await this.Auth.currentAuthenticatedUser({ bypassCache: true }); // Let state change listener handle user object
    } catch (e) { // User is invalid / not authenticated
      if (this.isLoggedIn()) this.notyf.error('You have been logged out');
      this.logout();
    }
  }

  public isLoggedIn = (): boolean => !!localStorage.getItem('isLoggedIn');

  public logout = async (): Promise<void> => await this.Auth.signOut();

  public signUp = async ({ firstName, lastName, email, password }:
    { firstName: string; lastName: string; email: string; password: string }): Promise<CustomResponse> => {
    try {
      const response = await this.Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          given_name: firstName,
          family_name: lastName
        }
      });

      return { success: true, details: response };
    } catch (e) {
      return this.handleSignUpError(e as CustomAuthError);
    }
  }

  private handleSignUpError = (e: CustomAuthError): CustomResponse => {
    const res: CustomResponse = { error: e, success: false };

    /*
        Cognito does not specify which key / value is causing the issues
        We must figure out the specific value that causes the error
        in order to provide accurate validation error messages
    */

    if (e.code === 'InvalidParameterException') {
      if (this._uilts.textContains(e.message, [ 'username' ])) res.error.code = 'InvalidUsernameException';
      if (this._uilts.textContains(e.message, [ 'email' ])) res.error.code = 'InvalidEmailException';
      if (this._uilts.textContains(e.message, [ 'password' ])) res.error.code = 'InvalidPasswordException';
    }

    return res;
  }
}
