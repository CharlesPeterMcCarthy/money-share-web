import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './pages/signup/signup.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DepositComponent } from './pages/deposit/deposit.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { LoggedInGuard } from './guards/logged-in/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out/logged-out.guard';
import { WithdrawComponent } from './pages/withdraw/withdraw.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [ LoggedOutGuard ] },
  { path: 'signup', component: SignUpComponent, canActivate: [ LoggedOutGuard ] },
  { path: 'login', component: LoginComponent, canActivate: [ LoggedOutGuard ] },
  { path: 'confirm/:email/:code', component: ConfirmEmailComponent, canActivate: [ LoggedOutGuard ] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [ LoggedInGuard ] },
  { path: 'deposit', component: DepositComponent, canActivate: [ LoggedInGuard ] },
  { path: 'withdraw', component: WithdrawComponent, canActivate: [ LoggedInGuard ] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [ LoggedInGuard ] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
