import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public config: object = environment.awsConfig.API.endpoints[0];
  public name: string = environment.awsConfig.API.endpoints[0].name;

  public handleError = (error: any): void => {
    if (!error.response || !error.response.data || !error.response.data) throw { message: 'Unknown Error' };
    throw error.response.data.error || error.response.data.message;
  }

}
