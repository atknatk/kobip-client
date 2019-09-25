import { Injectable } from '@angular/core';
import { KbStorageService } from '../storage/storage.service';
import { kobipConfig } from '../../kobip.config';
import { KbAuthUser } from '../../../model/auth-user';
import { deepCopy } from '../util/util';
import { isNullOrUndefined } from 'util';

declare const $: any;

@Injectable()
export class KbFixDataService {


  fix(value: any): any {
    const cloned = deepCopy(value);
    for (const property in cloned) {
      if (cloned.hasOwnProperty(property)) {
        if (cloned[property] === 'null') {
          cloned[property] = null;
        }
        if (!isNullOrUndefined(cloned[property]) && !isNaN(cloned[property])) {
          cloned[property] = +cloned[property];
        }
      }
    }
    return cloned;
  }
}
