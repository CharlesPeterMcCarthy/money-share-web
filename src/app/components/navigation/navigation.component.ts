import { Component } from '@angular/core';
import { NavLink } from '../../interfaces/nav-link';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.styl']
})
export class NavigationComponent {

  public navLinks: NavLink[] = [
    { text: 'Login', url: '/login' },
    { text: 'Sign Up', url: '/signup' },
    { text: 'Dashboard', url: '/dashboard' },
    { text: 'Deposit', url: '/deposit' },
    { text: 'Withdraw', url: '/withdraw' },
    { text: 'Transactions', url: '/transactions' },
    { text: 'Send Money', url: '/send-money' },
    { text: 'My Profile', url: '/profile' }
  ];

}
