import { Component, Input } from '@angular/core';
import { NavLink } from '../../../interfaces/nav-link';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.styl']
})
export class NavLinkComponent {

  @Input() public navLink: NavLink;

  public constructor(
    private router: Router
  ) { }

  public isActive = (): boolean => this.navLink.url === this.router.url;

}
