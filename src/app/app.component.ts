import { Component } from '@angular/core';
import { faBars, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {

  public navIcon: IconDefinition = faBars;
  public closeNavIcon: IconDefinition = faTimes;

}
