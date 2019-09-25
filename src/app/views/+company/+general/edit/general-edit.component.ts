import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GeneralService } from '../general.service';
import { ActivatedRoute } from '@angular/router';
import { KbNotificationService } from '../../../../shared/services/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { KbLoadingBase } from '../../../../components/loading/loading.base';
import { KbHashId } from '../../../../shared/services/hashids/hashids.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isArray } from 'util';
import { KbEnumService } from '../../../../shared/services/enum/enum.service';
import { Observable } from 'rxjs/Observable';
import { EnumModel } from '../../../../shared/services/enum/enum.model';
import { GeolocationService } from '../../../../shared/services/geolocation/geolocation.service';
import { KbHttpService } from '../../../../shared/services/http/http.service';
import { KbDuallistComponent } from '../../../../components/duallist/duallist.component';
import { KbFixDataService } from '../../../../shared/services/fixdata/fix-data.service';

declare const $: any;

@Component({
  templateUrl: 'general-edit.component.html',
  providers: [GeolocationService]
})
export class GeneralEditComponent extends KbLoadingBase implements OnInit, OnDestroy {
  form: FormGroup;
  observableCompanyCategory: Observable<EnumModel[]>;
  observableUnit: Observable<EnumModel[]>;
  observableTest: Observable<EnumModel[]>;
  localCityCountry = '';
  intCityCountry = '';
  @ViewChild('purchasinglist') purchasinglistComponent: KbDuallistComponent;
  @ViewChild('saleslist') saleslistComponent: KbDuallistComponent;
  imagePath = 'assets/kb_img/kb_profil/no_avatar_transparent.png';

  flag: string;
  private sub: Subscription;
  private isSelectedSalesCountries = false;
  private isLoadedSalesCountries = false;
  private isSelectedPurchasingCountries = false;
  private isLoadedPurchasingCountries = false;
  private id: number;
  private purchasingSelectedList: EnumModel[] = [];
  private salesSelectedList: EnumModel[] = [];

  constructor(private _service: GeneralService,
              private _route: ActivatedRoute,
              private _http: KbHttpService,
              private _nf: KbNotificationService,
              private _translate: TranslateService,
              private _hash: KbHashId,
              private _fix: KbFixDataService,
              private _fb: FormBuilder,
              public _enum: KbEnumService,
              public _geo: GeolocationService) {
    super();
    const arr: EnumModel[] = [];
    for (let i = 0; i < 100; i++) {
      arr.push({
        id: i + '',
        display: i + ''
      });
    }
    this.observableTest = Observable.of(arr);
  }


  uploadFinishEvent(uploadedFile) {
    this._http.put({id: uploadedFile.id}, `Company/Image`, {loadingBase: this})
      .subscribe(value => {
        if (value.isSuccess) {
          this.imagePath = uploadedFile.path;
        } else {
          this._nf.showKobipResultMessage(value);
        }
      });
  }

  getFlagUrl() {
    return 'assets/images/flags/iso/32/' + this.flag + '.png';
  }

  getLocation() {
    this._geo.getLocation().subscribe(res => {
      if (res && isArray(res)) {
        this.form.patchValue({localCityName: res[0]});
        this.localCityCountry = res[1];
      }
    });
    this._geo.getLocation(true).subscribe(res => {
      if (res && isArray(res)) {
        this.form.patchValue({intCityName: res[0]});
        this.intCityCountry = res[1];
      }
    });
  }

  getPhoneMaskOptions() {
    const that = this;
    return {
      onKeyValidation: function () {
        let country = $(this).inputmask('getmetadata')['cc'];
        if (country && isArray(country)) {
          country = country[0];
        }
        if (country !== that.flag) {
          that.flag = country;
        }
      }
    };
  }

  loadedPurchasingCountry(countries: EnumModel[]) {
    this.isLoadedPurchasingCountries = true;
    this.selectPurchasingCountry();
  }

  loadedSalesCountry(countries: EnumModel[]) {
    this.isLoadedSalesCountries = true;
    this.selectSalesCountry();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.observableCompanyCategory = this._enum.companyCategory();
    this.observableUnit = this._enum.unit();
    this.initializaForm();
    this.getCompanyId();
  }

  purchasingSelectedListEvent(data: EnumModel[]) {
    this.purchasingSelectedList = data;
  }

  salesSelectedListEvent(data: EnumModel[]) {
    this.salesSelectedList = data;
  }

  updateCompany() {
    const value = this.getCompanyData();
    this._http.put(value, 'Company', {loadingBase: this}).subscribe(res => {
      this._nf.showKobipResultMessage(res);
    });
  }

  private getCompanyData(): any {
    const val = this.form.getRawValue();
    val.companyPurchasingCountryList = [];
    const companyPurchasingCountryList: number[] = [];
    if (this.purchasingSelectedList) {
      for (let i = 0; i < this.purchasingSelectedList.length; i++) {
        const id = this.purchasingSelectedList[i].id;
        val.companyPurchasingCountryList.push(id);
      }
    }

    val.companySalesCountryList = [];
    const companySalesCountryList: number[] = [];
    if (this.salesSelectedList) {
      for (let i = 0; i < this.salesSelectedList.length; i++) {
        const id = this.salesSelectedList[i].id;
        val.companySalesCountryList.push(id);
      }
    }
    return val; // this._fix.fix(val);
  }

  private getCompanyId() {
    this.sub = this._route.params.subscribe(params => {
      const id: string = params['id'];
      if (id) {
        this.id = +this._hash.decode(id);
        this.loadData();
      } else {
        this._translate.get('errors.company.general.id').subscribe(mes => {
          this._nf.error(mes);
        });
      }
    });
  }

  private initializaForm() {
    this.form = this._fb.group({
      taxNo: [{value: '', disabled: true}],
      localName: [''],
      localShortName: [''],
      internationalName: [''],
      internationalShortName: [''],
      localAddress: [''],
      localAddress2: [''],
      internationalAddress: [''],
      internationalAddress2: [''],
      postalCode: [''],
      phone: [''],
      internationalPhone: [''],
      localPhone: [''],
      internationalMail: [''],
      localMail: [''],
      web: [''],
      iconPath: [''],
      customerScore: [0],
      kobipScore: [0],
      idCompanyCategory: [0],
      companyType: [''],
      localCityName: [''],
      intCityName: [''],
      isInternationalUsage: [''],
      kobipAuthorizedPersonName: [''],
      companyUnitList: [null],
      kobipAuthorizedPersonMail: [''],
      kobipAuthorizedPersonPhone: [''],
      isSuspended: [false],
      companySalesCountryList: [null],
      companyPurchasingCountryList: [null],
      idCountry: [0],
      id: 0
    });
  }

  private loadCompany(): Observable<any> {
    return Observable.create(promise => {
      const company = this._service.getLocalCompany();
      if (company.id === this.id) {
        if (company.imagePath) {
          this.imagePath = company.imagePath;
        }
        this.form.patchValue(company);
        promise.next(company);
        promise.complete();
      } else {
        this._service.getCompany().subscribe(res => {
          if (res.isSuccess && res.data && isArray(res.data) && res.data.length === 1) {
            this.form.patchValue(res.data[0]);
            if (res.data[0].imagePath) {
              this.imagePath = res.data[0].imagePath;
            }
            promise.next(res.data[0]);
          } else {
            this._nf.showKobipResultMessage(res);
          }
          promise.complete();
        });
      }
    });
  }

  private loadCountryList(): Observable<any> {
    // return Observable.create(promise => {
    //   this._http.get('Country').subscribe(res => {
    //     if (res.isSuccess && res.data && res.data.length > 0) {
    //       for (let i = 0; i < res.data.length; i++) {
    //         const item = res.data[i];
    //         this._translate.get(`${item.id}`).subscribe(display => {
    //           const data = {
    //             id: item.id,
    //             display: display
    //           };
    //           this.purchasinglistComponent.leftList.push($.extend(true, {}, data));
    //           this.saleslistComponent.leftList.push($.extend(true, {}, data));
    //
    //         });
    //       }
    //
    //     }
    //     promise.next(this.purchasinglistComponent.leftList);
    //     this.purchasinglistComponent.changeLeftMessage('');
    //     this.saleslistComponent.changeLeftMessage('');
    //     promise.complete();
    //   });
    // });

    return this._enum.country();
  }

  private loadData() {
    const tasks$ = [];
    tasks$.push(this.loadCountryList());
    tasks$.push(this.loadCompany());
    Observable.forkJoin(...tasks$).subscribe(res => {
      this.selectPurchasingCountry();
      this.selectSalesCountry();
    });
  }

  private selectPurchasingCountry() {
    if (this.form.getRawValue().id === 0 || this.isSelectedPurchasingCountries === true ||
      this.isLoadedPurchasingCountries === false) {
      return;
    }
    this.isSelectedPurchasingCountries = true;
    this.form.getRawValue().companyPurchasingCountryList.forEach(countryId => {
      const filtered = this.purchasinglistComponent.leftList.filter((item => item.id === countryId));
      if (filtered && filtered.length === 1) {
        this.purchasinglistComponent.selectLeftList(filtered);
      }
    });
  }

  private selectSalesCountry() {
    if (this.form.getRawValue().id === 0 || this.isSelectedSalesCountries === true ||
      this.isLoadedSalesCountries === false) {
      return;
    }
    this.isSelectedSalesCountries = true;
    this.form.getRawValue().companySalesCountryList.forEach(countryId => {
      const filtered = this.saleslistComponent.leftList.filter((item => item.id === countryId));
      if (filtered && filtered.length === 1) {
        this.saleslistComponent.selectLeftList(filtered);
      }
    });
  }

}
