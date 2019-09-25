import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { KbHttpService } from '../../shared/services/http/http.service';
import { IKbHttpExtraConfig } from '../../shared/services/http/http-result-extra.config';
import { KbResultDataBase } from '../../shared/services/http/http-result.model';

@Injectable()
export class PersonalService {
  personal: any = {};

  constructor(private _http: KbHttpService) {

  }

  getCompany(extra?: IKbHttpExtraConfig): Observable<KbResultDataBase<any[]>> {
    return this._http.get('Employee/Current', extra);
  }

  getLocalPersonal(): any {
    return this.personal;
  }

  storeLocalPersonal(company: any): void {
    this.personal = company;
  }


}
