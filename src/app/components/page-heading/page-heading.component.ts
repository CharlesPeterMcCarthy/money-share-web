import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-heading',
  templateUrl: './page-heading.component.html',
  styleUrls: ['./page-heading.component.styl']
})
export class PageHeadingComponent {

  @Input() public title: string;

  public get Title(): string { return this.title.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '); }

}
