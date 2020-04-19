import { Component, Input } from '@angular/core';
import { NavLink } from '../../interfaces/nav-link';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.styl']
})
export class NavigationComponent {

  @Input() public drawer: MatDrawer;

  public navLinks: NavLink[] = [
    { text: 'Dashboard', url: '/dashboard' },
    { text: 'Deposit', url: '/deposit' },
    { text: 'Withdraw', url: '/withdraw' },
    { text: 'Transactions', url: '/transactions' },
    { text: 'Send Money', url: '/send-money' },
    { text: 'My Profile', url: '/profile' }
  ];

}
