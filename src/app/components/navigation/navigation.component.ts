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
    { text: 'Sign Up', url: '/search' }
  ];

}
