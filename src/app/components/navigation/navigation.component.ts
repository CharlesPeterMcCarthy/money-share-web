import { Component, OnInit } from '@angular/core';
import { NavLink } from '../../interfaces/nav-link';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.styl']
})
export class NavigationComponent implements OnInit {

  public navLinks: NavLink[] = [
    { text: 'Login', url: '/login' },
    { text: 'Sign Up', url: '/search' }
  ];

  public constructor() { }

  public ngOnInit(): void { }

}
