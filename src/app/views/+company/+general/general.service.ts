import { Injectable } from '@angular/core';
import { KbHttpService } from '../../../shared/services/http/http.service';
import { KbResultDataBase } from '../../../shared/services/http/http-result.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GeneralService {
  private company: any = {};

  constructor(private _http: KbHttpService) {
  }


  getCompany(): Observable<KbResultDataBase<any[]>> {
    return this._http.get('Company');
  }

  getLocalCompany(): any {
    return this.company;
  }

  getPurchasingCountry(): Observable<any> {
    return this._http.get('Company/PurchasingCountry').map(res => {
      if (res.isSuccess) {
        return res.data;
      }
      return [];
    });
  }

  getSalesCountries(): Observable<any> {
    return this._http.get('Company/SalesCountry').map(res => {
      if (res.isSuccess) {
        return res.data;
      }
      return [];
    });
  }

  storeLocalCompany(company: any): void {
    this.company = company;
  }


}
