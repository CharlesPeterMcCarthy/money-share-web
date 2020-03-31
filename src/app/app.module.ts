import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatSidenavModule } from '@angular/material/sidenav';
import { SignUpComponent } from './pages/signup/signup.component';
import { NOTYF, notyfFactory } from './utils/notyf.token';
import { NavLinkComponent } from './components/navigation/nav-link/nav-link.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
	declarations: [
	  AppComponent,
    SignUpComponent,
    NavLinkComponent,
    NavigationComponent
	],
	exports: [
		MatSidenavModule
	],
	imports: [
  	BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    FontAwesomeModule
	],
	providers: [
    {
      provide: NOTYF,
      useFactory: notyfFactory
    }
  ],
	bootstrap: [AppComponent]
})
export class AppModule { }
