import { Component, OnInit } from '@angular/core';
import { faBars, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  public constructor(
    private _title: Title,
    private auth: AuthService
  ) { }

  public async ngOnInit(): Promise<void> {
    this._title.setTitle('MoneyShare');
    await this.auth.checkUserAuthenticated();
  }

  public navIcon: IconDefinition = faBars;
  public closeNavIcon: IconDefinition = faTimes;

}
