import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KbLoadingBase } from '../../../components/loading/loading.base';
import { KbNotificationService } from '../../../shared/services/notification/notification.service';
import { KbHashId } from '../../../shared/services/hashids/hashids.service';
import { GeneralService } from './general.service';
import { KbEnumService } from '../../../shared/services/enum/enum.service';
import { Observable } from 'rxjs/Observable';
import { EnumModel } from '../../../shared/services/enum/enum.model';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined } from 'util';

declare var jQuery: any;

@Component({
  templateUrl: 'general.component.html'
})
export class GeneralComponent extends KbLoadingBase implements OnInit, AfterViewInit {
  company: any = {};
  imagePath = 'assets/kb_img/kb_profil/profile_small.jpg'
  observableCompanyUnits: Observable<EnumModel[]>;
  observableSalesCountries: Observable<EnumModel[]>;
  observablePurchasingCountries: Observable<EnumModel[]>;
  hash: KbHashId;

  constructor(private _nf: KbNotificationService,
              private _hash: KbHashId,
              private _service: GeneralService,
              private _enum: KbEnumService,
              private _translate: TranslateService) {
    super();
    this.hash = _hash;

  }

  initCompanyCategory(id) {
    this._enum.companyCategory().map(res => this._enum.filter([id], res)).subscribe(res => {
      if (res && res.length === 1) {
        if (res[0]) {
          this._translate.get(res[0].display).subscribe(lang => {
            this.company.langCompanyCategory = lang;
          });
        }
      }
    });
  }

  initUnit(units) {
    this.observableCompanyUnits = this._enum.unit().map(res => this._enum.filter(units, res));
  }

  loadCompany(showContentOnLoading = true) {
    this.showLoading(showContentOnLoading);
    this._service.getCompany().subscribe(res => {
      this.hideLoading();
      if (res.isSuccess && res.data && res.data.length === 1) {
        this.company = res.data[0];
        this.imagePath = this.company.imagePath;
        this.initUnit(this.company.companyUnitList);
        this.initCompanyCategory(this.company.idCompanyCategory);
        this._service.storeLocalCompany(this.company);

      } else {
        // TODO data 1 den fazla ise ya da yoksa mesajı düzelt.
        this._nf.showKobipResultMessage(res);
      }
    });
  }

  loadPurchasingCountries() {
    this.observablePurchasingCountries = this._service.getPurchasingCountry();
  }

  loadSalesCountries() {
    this.observableSalesCountries = this._service.getSalesCountries();
  }

  ngAfterViewInit(): void {
    if (!isNullOrUndefined(this.company.idCountry)) {
      this._translate.getTranslation('en').subscribe((_) => {
        this.company.enCountry = _.zzc[this.company.idCountry.split('.')[1]];
      });
    }
  }

  ngOnInit(): void {
    this.loadCompany(false);
    this.loadPurchasingCountries();
    this.loadSalesCountries();
  }
}
