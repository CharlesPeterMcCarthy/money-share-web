import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { CustomResponse } from '../../auth/auth.service';
import { API } from 'aws-amplify';
import { LastEvaluatedKey } from '@moneyshare/common-types';

@Injectable({
  providedIn: 'root'
})
export class WithdrawAPIService {

  public constructor(
    private _api: ApiService
  ) { }

  public GetAll = (lastEvaluatedKey?: LastEvaluatedKey): Promise<CustomResponse> =>
    API.post(this._api.name, `/withdraw`, { body: { lastEvaluatedKey } }).catch(this._api.handleError);

  public WithdrawMoney = (amount: number): Promise<CustomResponse> =>
    API.put(this._api.name, `/withdraw/${amount}`, '').catch(this._api.handleError);

}
