import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'page-heading',
  templateUrl: './page-heading.component.html',
  styleUrls: ['./page-heading.component.styl']
})
export class PageHeadingComponent {

  @Input() public title: string;

  public get Title(): string { return this.title.charAt(0).toUpperCase() + this.title.slice(1).toLowerCase(); }

}
