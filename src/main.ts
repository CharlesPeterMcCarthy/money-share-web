import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Amplify from 'aws-amplify';

const cognitoConfig = environment.cognitoConfig;
Amplify.configure(cognitoConfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err: Error) => console.error(err));
