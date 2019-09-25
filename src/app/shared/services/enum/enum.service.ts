import { Injectable } from '@angular/core';
import { KbHttpService } from '../http/http.service';
import { Observable } from 'rxjs/Observable';
import { KbResultDataBase } from '../http/http-result.model';
import { EnumModel } from './enum.model';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined } from 'util';
import { IKbEnumConfig, KbEnumConfig } from './enum-extra.config';
import { observable } from 'rxjs/symbol/observable';

@Injectable()
export class KbEnumService {
  private enumMap = new Map<string, EnumModel[]>();

  constructor(private _http: KbHttpService,
              private _translate: TranslateService) {
  }

  abusementType(config?: IKbEnumConfig): Observable<EnumModel[]> {
    return this.getEnum('AbusementType', config);
  }

  companyCategory(config?: IKbEnumConfig): Observable<EnumModel[]> {
    return this.getEnum('CompanyCategory', config);
  }

  companyType(config?: IKbEnumConfig): Observable<EnumModel[]> {
    return this.getEnum('CompanyType', config);
  }

  companyUserCategory(config?: IKbEnumConfig): Observable<EnumModel[]> {
    return this.getEnum('CompanyUserCategory', config);
  }

  country(config?: IKbEnumConfig): Observable<EnumModel[]> {
    return this.getEnum('Country', config);
  }

  currency(config?: IKbEnumConfig): Observable<EnumModel[]> {
    return this.getEnum('Currency', config);
  }

  deliveryDuration(config?: IKbEnumConfig): Observable<EnumModel[]> {
    return this.getEnum('DeliveryDuration', config);
  }

  deliveryType(config?: IKbEnumConfig): Observable<EnumModel[]> {
    return this.getEnum('DeliveryType', config);
  }

  expenseType(config?: IKbEnumConfig): Observable<EnumModel[]> {
    return this.getEnum('ExpenseType', config);
  }

  fileType(config?: IKbEnumConfig): Observable<EnumModel[]> {
    return this.getEnum('FileType', config);
  }

  filter(ids: string[], result: EnumModel[]): EnumModel[] {
    const res = [];
    ids.forEach((item) => {
      const filtered = result.filter((enumItem) => enumItem.id === item);
      if (filtered.length === 1) {
        res.push(filtered[0]);
      }
    });
    return res;
  }

  initialPage(config?: IKbEnumConfig): Observable<EnumModel[]> {
    return this.getEnum('InitialPage', config);
  }

  language(config?: IKbEnumConfig): Observable<EnumModel[]> {
    return this.getEnum('Language', config);
  }

  paymentType(config?: IKbEnumConfig): Observable<EnumModel[]> {
    return this.getEnum('PaymentType', config);
  }

  postingType(config?: IKbEnumConfig): Observable<EnumModel[]> {
    return this.getEnum('PostingType', config);
  }

  timeName(config?: IKbEnumConfig): Observable<EnumModel[]> {
    return this.getEnum('TimeName', config);
  }

  transactionType(config?: IKbEnumConfig): Observable<EnumModel[]> {
    return this.getEnum('TransactionType', config);
  }

  transportationType(config?: IKbEnumConfig): Observable<EnumModel[]> {
    return this.getEnum('TransportationType', config);
  }

  unit(config?: IKbEnumConfig): Observable<EnumModel[]> {
    return this.getEnum('Unit', config);
  }

  updateReason(config?: IKbEnumConfig): Observable<EnumModel[]> {
    return this.getEnum('UpdateReason', config);
  }

  updateSource(config?: IKbEnumConfig): Observable<EnumModel[]> {
    return this.getEnum('UpdateSource', config);
  }

  private getEnum(url: string, config?: IKbEnumConfig): Observable<any> {
    if (isNullOrUndefined(config)) {
      config = new KbEnumConfig();
    }
    if (this.enumMap.has(url)) {
      return Observable.create(observer => {
        observer.next(this.enumMap.get(url));
        observer.complete();
      });
    } else {

      return this._http.get(url, {useMap: false}).map(res => {
        const result = [];
        if (res.isSuccess) {
          this.translateEnum(res.data, config).subscribe(translateResult => {
            result.push(translateResult);
          });
        }
        this.enumMap.set(url, result);
        return result;
      });
    }
  }


  private translateEnum(data: EnumModel[], config: IKbEnumConfig): Observable<any> {
    return Observable.create(promise => {
      const $task = [];
      if (config.addSelect === true) {
        $task.push(this._translate.get('component.select'));
      }
      for (let i = 0; i < data.length; i++) {
        $task.push(this._translate.get(data[i].id));
      }
      if (config.addSelect === true) {
        data = [{id: null, display: ''}].concat(data);
      }
      Observable.forkJoin($task).subscribe(results => {
        for (let i = 0; i < results.length; i++) {
          promise.next({
            id: data[i].id,
            display: results[i] + ''
          });
        }
        // promise.next(result);
        promise.complete();
      });
    });
  }

}
