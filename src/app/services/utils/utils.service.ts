import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public textContains = (text: string, values: string[]): boolean => _.every(values, (val: string) => text.indexOf(val) > -1);

}
