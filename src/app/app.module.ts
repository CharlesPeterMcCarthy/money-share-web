import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { NOTYF, notyfFactory } from './utils/notyf.token';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AmplifyAngularModule, AmplifyModules, AmplifyService } from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';
import { LoginState, SignUpState, ConfirmEmailState, UserState, DepositState, TransactionState } from './ngxs/states';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';

import { AppComponent } from './app.component';

import { SignUpComponent } from './pages/signup/signup.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { DepositComponent } from './pages/deposit/deposit.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

import { NavLinkComponent } from './components/navigation/nav-link/nav-link.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PageHeadingComponent } from './components/page-heading/page-heading.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { MoneyPipe } from './pipes/money/money.pipe';
import { TimeSincePipe } from './pipes/time-since/time-since.pipe';
import { TransactionSignPipe } from './pipes/transaction-sign/transaction-sign.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    NavLinkComponent,
    NavigationComponent,
    PageHeadingComponent,
    SpinnerComponent,
    ConfirmEmailComponent,
    LoginComponent,
    DashboardComponent,
    DepositComponent,
    TransactionsComponent,
    TransactionComponent,
    MoneyPipe,
    TimeSincePipe,
    TransactionSignPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatInputModule,
    MatButtonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    NgxsModule.forRoot([
      LoginState,
      SignUpState,
      ConfirmEmailState,
      UserState,
      DepositState,
      TransactionState
    ]),
    NgxsDispatchPluginModule.forRoot()
  ],
  providers: [
    {
      provide: AmplifyService,
      useFactory: (): AmplifyAngularModule => {
        return AmplifyModules({
          Auth
        });
      }
    },
    {
      provide: NOTYF,
      useFactory: notyfFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
