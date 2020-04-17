import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { CustomResponse } from '../../auth/auth.service';
import { API } from 'aws-amplify';
import { LastEvaluatedKey } from '@moneyshare/common-types';

@Injectable({
  providedIn: 'root'
})
export class TransactionAPIService {

  public constructor(
    private _api: ApiService
  ) { }

  public GetAll = (lastEvaluatedKey?: LastEvaluatedKey): Promise<CustomResponse> =>
    API.post(this._api.name, '/transaction/all', { body: { lastEvaluatedKey } }).catch(this._api.handleError);

}
