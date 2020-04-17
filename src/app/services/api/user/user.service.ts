import { Injectable } from '@angular/core';
import { API } from 'aws-amplify';
import { ApiService } from '../../api.service';
import { CustomResponse } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  public constructor(
    private _api: ApiService
  ) { }

  public GetUser = (): Promise<CustomResponse> => API.get(this._api.name, '/users/current', '').catch(this._api.handleError);

}
