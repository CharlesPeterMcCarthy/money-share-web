import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { CustomResponse } from '../../auth/auth.service';
import { API } from 'aws-amplify';
import { Transfer } from '@moneyshare/common-types';

@Injectable({
  providedIn: 'root'
})
export class SendMoneyAPIService {

  public constructor(
    private _api: ApiService
  ) { }

  public SendMoney = (transfer: Partial<Transfer>): Promise<CustomResponse> =>
    API.put(this._api.name, `/transfer`, { body: { transfer } }).catch(this._api.handleError);

}
