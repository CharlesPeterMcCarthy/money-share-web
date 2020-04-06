import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public config: object = environment.awsConfig.API.endpoints[0];
  public name: string = environment.awsConfig.API.endpoints[0].name;

}
