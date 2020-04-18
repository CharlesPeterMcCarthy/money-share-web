import { Injectable } from '@angular/core';
import { CustomResponse } from '../../auth/auth.service';
import { API } from 'aws-amplify';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class DepositAPIService {

  public constructor(
    private _api: ApiService
  ) { }

  public BeginDeposit = (amount: number): Promise<CustomResponse> =>
    API.post(this._api.name, `/deposit/${amount}`, '').catch(this._api.handleError);

  public CompleteDeposit = (clientSecret: string): Promise<CustomResponse> =>
    API.put(this._api.name, '/deposit/complete', { body: { clientSecret } }).catch(this._api.handleError);

}
