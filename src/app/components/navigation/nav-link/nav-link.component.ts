import { Component, Input, OnInit } from '@angular/core';
import { NavLink } from '../../../interfaces/nav-link';

@Component({
  selector: 'nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.styl']
})
export class NavLinkComponent implements OnInit {

  @Input() public navLink: NavLink;

  public constructor() { }

  public ngOnInit(): void { }

}
