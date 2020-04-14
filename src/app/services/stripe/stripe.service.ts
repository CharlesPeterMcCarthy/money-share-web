import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  public constructor(
    private _api: ApiService
  ) { }

  private handleError = (error: any): void => {
    if (!error.response || !error.response.data || !error.response.data) throw { message: 'Unknown Error' };
    throw error.response.data.error || error.response.data.message;
  }

}
