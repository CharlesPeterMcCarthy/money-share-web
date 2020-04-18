import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { CustomResponse } from '../../auth/auth.service';
import { API } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class WithdrawAPIService {

  public constructor(
    private _api: ApiService
  ) { }

  public WithdrawMoney = (amount: number): Promise<CustomResponse> =>
    API.put(this._api.name, `/withdraw/${amount}`, '').catch(this._api.handleError);

}
