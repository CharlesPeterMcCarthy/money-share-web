import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './pages/signup/signup.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DepositComponent } from './pages/deposit/deposit.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { LoggedInGuard } from './guards/logged-in/logged-in.guard';

const routes: Routes = [
  { path: '', component: SignUpComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'confirm/:email/:code', component: ConfirmEmailComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [ LoggedInGuard ] },
  { path: 'deposit', component: DepositComponent, canActivate: [ LoggedInGuard ] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [ LoggedInGuard ] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
