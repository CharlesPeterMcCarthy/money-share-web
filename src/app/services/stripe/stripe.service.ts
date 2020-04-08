import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { CustomResponse } from '../auth/auth.service';
import { API } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  public constructor(
    private _api: ApiService
  ) { }

  public CreatePaymentIntent = (amount: number): Promise<CustomResponse> =>
    API.get(this._api.name, `/stripe/payment-intent/create/${amount}`, '').catch(this.handleError);

  private handleError = (error: any): void => {
    if (!error.response || !error.response.data || !error.response.data) throw { message: 'Unknown Error' };
    throw error.response.data.error || error.response.data.message;
  }

}
