import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public config: object = environment.awsConfig.API.endpoints[0];
  public name: string = environment.awsConfig.API.endpoints[0].name;

  public constructor(
    @Inject(NOTYF) private _notyf: Notyf
  ) { }

  public handleError = (error: any): void => {
    this._notyf.error(error.response.data.error.description || error.response.data.error.message || 'Unknown Error');
    if (!error.response || !error.response.data || !error.response.data.error) throw { message: 'Unknown Error' };
    throw error.response.data.error.description || error.response.data.error.message;
  }

}
