import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { KbHttpService } from '../../../shared/services/http/http.service';
import { KbEnumService } from '../../../shared/services/enum/enum.service';
import { EnumModel } from '../../../shared/services/enum/enum.model';


@Injectable()
export class HotAdsService {


  constructor(private _http: KbHttpService,
              private _enum: KbEnumService) {

  }

  public categoryListData(pattern: string, maxResults?: number): Observable<any[]> {
    return this._http.get(`category?limit=${maxResults}&offset=0&pattern=${pattern}`)
      .map(res => {
        if (res.isSuccess) {
          return res.data;
        }
        return [];
      });
  }

  public categoryListDataMax(pattern: string, maxResults: number): Observable<{ count: number, results: any[] }> {
    return this.categoryListData(pattern, maxResults).pipe(map(t => {
      return {
        count: 1212,
        results: t
      };
    }));
  }

  public countryGetItems(ids: string[]): Observable<EnumModel[]> {
    return this.countryListData('')
    // .concatMap(arr => Observable.from(arr))
      .map((items: any) => items.filter(item => ids.indexOf(item.id) !== -1));
  }

  public countryListData(pattern: string, maxResults?: number): Observable<any[]> {
    return this._enum.country().pipe(map(t => {
      return t.filter(item => item.display.toLocaleLowerCase().indexOf(pattern.toLocaleLowerCase()) !== -1)
        .sort(this.sortFunction);
    }));
  }

  public countryListDataMax(pattern: string, maxResults: number): Observable<{ count: number, results: any[] }> {
    return this.countryListData(pattern, maxResults).pipe(map(t => {
      return {
        count: t.length,
        results: t
      };
    }));
  }

  private sortEnumFunction(obj1: EnumModel, obj2: EnumModel) {
    if (obj1.display < obj2.display) {
      return -1;
    }
    if (obj1.display > obj2.display) {
      return 1;
    }
    return 0;
  }

  private sortFunction(obj1: any, obj2: any) {
    if (obj1.name < obj2.name) {
      return -1;
    }
    if (obj1.name > obj2.name) {
      return 1;
    }
    return 0;
  }

}
