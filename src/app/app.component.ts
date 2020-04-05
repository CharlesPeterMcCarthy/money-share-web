import { Component, OnInit } from '@angular/core';
import { faBars, faSignOutAlt, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { AuthService } from './services/auth/auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  public signOutIcon: IconDefinition = faSignOutAlt;
  public navIcon: IconDefinition = faBars;
  public closeNavIcon: IconDefinition = faTimes;
  public brandName: string = environment.brand;

  public constructor(
    private _title: Title,
    private _auth: AuthService
  ) { }

  public async ngOnInit(): Promise<void> {
    this._title.setTitle(environment.brand);
    await this._auth.checkUserAuthenticated();
  }

  public signOut = async (): Promise<void> => {
    await this._auth.signOut();
  }

  public isLoggedIn = (): boolean => this._auth.isLoggedIn();

}
