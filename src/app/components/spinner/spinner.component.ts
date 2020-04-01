import { Component, Input } from '@angular/core';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.styl']
})
export class SpinnerComponent {

  @Input() public text: string;
  @Input() public name: string;
  @Input() public fullScreen: boolean = true;

}
