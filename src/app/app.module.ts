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
import { MatDividerModule } from '@angular/material/divider';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';

import { NOTYF, notyfFactory } from './utils/notyf.token';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AmplifyAngularModule, AmplifyModules, AmplifyService } from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';

import { AppComponent } from './app.component';

import { SignUpComponent } from './pages/signup/signup.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { DepositComponent } from './pages/deposit/deposit.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { WithdrawComponent } from './pages/withdraw/withdraw.component';
import { SendMoneyComponent } from './pages/send-money/send-money.component';

import { NavLinkComponent } from './components/navigation/nav-link/nav-link.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PageHeadingComponent } from './components/page-heading/page-heading.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { MoneyPipe } from './pipes/money/money.pipe';
import { TimeSincePipe } from './pipes/time-since/time-since.pipe';
import { TransactionSignPipe } from './pipes/transaction-sign/transaction-sign.pipe';

import { ProfileComponent } from './pages/profile/profile.component';
import { ViewProfileComponent } from './components/profile/view-profile/view-profile.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { MoneyBottomSheetComponent } from './components/money-bottom-sheet/money-bottom-sheet.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { DepositCardComponent } from './components/deposit/deposit.component';

import {
  LoginState,
  SignUpState,
  ConfirmEmailState,
  UserState,
  DepositState,
  TransactionState,
  WithdrawState,
  SendMoneyState,
  ProfileState,
  UserSearchDialogState
} from './ngxs/states';
import { UserSearchDialogComponent } from './components/user-search-dialog/user-search-dialog.component';
import { DashboardState } from './ngxs/states/dashboard.state';

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
    TransactionSignPipe,
    WithdrawComponent,
    SendMoneyComponent,
    ProfileComponent,
    ViewProfileComponent,
    EditProfileComponent,
    MoneyBottomSheetComponent,
    PageFooterComponent,
    UserItemComponent,
    UserSearchDialogComponent,
    DepositCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatBottomSheetModule,
    MatListModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatStepperModule,
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
      WithdrawState,
      TransactionState,
      SendMoneyState,
      ProfileState,
      UserSearchDialogState,
      DashboardState
    ], {
      developmentMode: true
    }),
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
