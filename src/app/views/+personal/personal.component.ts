import { Component, OnInit } from '@angular/core';
import { PersonalService } from './personal.service';
import { KbHashId } from '../../shared/services/hashids/hashids.service';
import { KbNotificationService } from '../../shared/services/notification/notification.service';
import { Router } from '@angular/router';
import { KbEnumService } from '../../shared/services/enum/enum.service';
import { TranslateService } from '@ngx-translate/core';
import { KbLoadingBase } from '../../components/loading/loading.base';
import { Observable } from 'rxjs/Observable';
import { isArray, isNullOrUndefined } from 'util';
import { EnumModel } from '../../shared/services/enum/enum.model';
import { kobipConfig } from '../../shared/kobip.config';
import { KbAuthUser } from '../../model/auth-user';
import { KbStorageService } from '../../shared/services/storage/storage.service';

@Component({
  templateUrl: 'personal.component.html'
})
export class PersonalComponent extends KbLoadingBase implements OnInit {

  personal: any = {user: {}};
  enumsData: any = {
    employeePurchasingCountryList: [],
    employeeSalesCountryList: [],
    employeeLanguageList: []
  };
  transportType: string[] = [];
  grantedRoles: number[];
  hash: KbHashId;

  constructor(private _router: Router,
              private _nf: KbNotificationService,
              private _hash: KbHashId,
              private _service: PersonalService,
              private _enum: KbEnumService,
              private _translate: TranslateService,
              private _storage: KbStorageService) {
    super();
    this.hash = _hash;
  }

  editPersonal() {
    this._router.navigate(['company/general/edit', this.hash.encode(this.personal.id)]);
  }

  getOnOffKey(value: boolean): Observable<string | any> {
    if (value === true) {
      return this._translate.get('shared.on');
    } else {
      return this._translate.get('shared.off');
    }
  }

  getSelectedDisplayHtml(item: string): string {
    const sb = [];
    if (isNullOrUndefined(item)) {
      return '<i class="fa fa-tags"></i>' + sb.join('');
    }
    const splittedArray = item.split(' > ');
    for (let i = 0; i < splittedArray.length; i++) {
      sb.push(`<span>${splittedArray[i]}</span>`);
    }
    return '<i class="fa fa-tags"></i>' + sb.join('<i class="fa fa-angle-right"></i>');
  }

  ngOnInit(): void {
    this.loadData();
    this.getGrantedRoles();
  }

  private getGrantedRoles() {
    const user: KbAuthUser = this._storage.getItem(kobipConfig.authUserKey);
    if (user && user.roleList) {
      this.grantedRoles = user.roleList;
    }
  }

  private loadCountry(allCountryList: EnumModel[], countryList: string[], key: string) {
    if (countryList && isArray(countryList)) {
      this.enumsData[key] = [];
      for (let i = 0; i < countryList.length; i++) {
        const filtered = allCountryList.filter(item => item.id === countryList[i]);
        if (filtered.length === 1) {
          this.enumsData[key].push(filtered[0].display);
        }
      }
    }
  }

  private loadData() {
    this.showLoading(false);
    const task$ = [];
    task$.push(this.loadPersonal());
    task$.push(this._enum.language());
    task$.push(this._enum.initialPage());
    task$.push(this._enum.deliveryDuration());
    task$.push(this._enum.deliveryType());
    task$.push(this._enum.country());

    Observable.forkJoin(...task$).subscribe((results: any[]) => {
      const personal: any = results[0];
      if (personal) {
        this.setEnumData(results[1], 'preferredLanguage');
        this.setEnumData(results[2], 'initialPage');
        this.setEnumData(results[3], 'deliveryDuration');
        this.loadDelivertType(results[4], personal.employeeDeliveryTypeList);
        this.loadTransportType(personal);
        this.loadCountry(results[5], personal.employeePurchasingCountryList, 'employeePurchasingCountryList');
        this.loadCountry(results[5], personal.employeeSalesCountryList, 'employeeSalesCountryList');
        this.loadLanguages(results[1], personal.employeeLanguageList);
        this.hideLoading();
      }
    });

  }

  private loadDelivertType(allDeliveryArray: EnumModel[], selectedDelivertTypeArray: string[]) {
    if (selectedDelivertTypeArray && isArray(selectedDelivertTypeArray)) {
      const task$ = [];
      for (let i = 0; i < selectedDelivertTypeArray.length; i++) {
        const filtered = allDeliveryArray.filter(item => item.id === selectedDelivertTypeArray[i]);
        if (filtered.length === 1) {
          task$.push(this._translate.get(filtered[0].display));
        }
      }
      Observable.forkJoin(...task$).subscribe(res => {
        this.enumsData.employeeDeliveryTypeList = res.join(', ');
      });
    }
  }

  private loadLanguages(allLanguageList: EnumModel[], languageList: string[]) {
    const task$ = [];
    if (languageList && isArray(languageList)) {
      for (let i = 0; i < languageList.length; i++) {
        const filtered = allLanguageList.filter(item => item.id === languageList[i]);
        if (filtered.length === 1) {
          task$.push(this.loadLanguagesObject(filtered[0]));
        }
      }
      Observable.forkJoin(...task$).subscribe(res => {
        this.enumsData.employeeLanguageList = res;
      });
    }
  }

  private loadLanguagesObject(language: EnumModel): Observable<any> {
    return Observable.create(promise => {
      this._translate.get(language.display).subscribe(res => {
        promise.next({value: res, id: language.id});
        promise.complete();
      });
    });
  }

  private loadPersonal(): Observable<any> {
    return Observable.create(promise => {
      this._service.getCompany().subscribe(res => {
        if (res.isSuccess && res.data) {
          this.personal = res.data;
          promise.next(this.personal);
          this._service.storeLocalPersonal(this.personal);
        } else {
          this._nf.showKobipResultMessage(res);
        }
        promise.complete();
      });
    });
  }

  private loadTransportType(personal: any): void {
    if (!isNullOrUndefined(personal.employeeTransportationTypeList) &&
      isArray(personal.employeeTransportationTypeList)) {
      this.transportType = personal.employeeTransportationTypeList;
    }
  }

  private setEnumData(enumArray: EnumModel[], key: string) {
    if (enumArray && isArray(enumArray)) {
      const serverKey = `id${key.charAt(0).toUpperCase()}${key.slice(1)}`;
      const prefLang = enumArray.filter(item => item.id === this.personal[serverKey]);
      if (prefLang && isArray(prefLang) && prefLang.length === 1) {
        this.enumsData[key] = prefLang[0].display;
      }
    }
  }

}
