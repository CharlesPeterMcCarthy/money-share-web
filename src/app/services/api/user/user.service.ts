import { Injectable } from '@angular/core';
import { API } from 'aws-amplify';
import { ApiService } from '../api.service';
import { CustomResponse } from '../../auth/auth.service';
import { User } from '@moneyshare/common-types';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  public constructor(
    private _api: ApiService
  ) { }

  public GetUser = (): Promise<CustomResponse> =>
    API.get(this._api.name, '/users/current', '').catch(this._api.handleError);

  public GetOtherUser = (userId: string): Promise<CustomResponse> =>
    API.get(this._api.name, `/users/${userId}`, '').catch(this._api.handleError);

  public EditProfile = (user: Partial<User>): Promise<CustomResponse> =>
    API.put(this._api.name, `/users`, { body: { user } }).catch(this._api.handleError);

  public UserSearch = (searchText: string): Promise<CustomResponse> =>
    API.get(this._api.name, `/users/search/${searchText}`, '').catch(this._api.handleError);

}
