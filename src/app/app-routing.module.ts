import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './pages/signup/signup.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';

const routes: Routes = [
  { path: '', component: SignUpComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'confirm/:email/:code', component: ConfirmEmailComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
