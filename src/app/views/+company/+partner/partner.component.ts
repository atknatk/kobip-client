import { Component, OnInit } from '@angular/core';
import { KbStorageService } from '../../../shared/services/storage/storage.service';
import { KbNotificationService } from '../../../shared/services/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { KbHttpService } from '../../../shared/services/http/http.service';
import { KbEnumService } from '../../../shared/services/enum/enum.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { KbLoadingBase } from '../../../components/loading/loading.base';
import { Observable } from 'rxjs/Observable';
import { KbFixDataService } from '../../../shared/services/fixdata/fix-data.service';
import { isNullOrUndefined } from 'util';
import { kobipConfig } from '../../../shared/kobip.config';
import { deepCopyArray, groupBy, sortBy } from '../../../shared/services/util/util';
import { EnumModel } from '../../../shared/services/enum/enum.model';
import { IPartnerSearchModel } from './partner-search.model';
import { invitationStatus } from '../../../shared/enums/invitation-status.enum';


declare var jQuery: any;

@Component({
  templateUrl: 'partner.component.html',
})
export class PartnerComponent extends KbLoadingBase implements OnInit {
  inviteForm: FormGroup;
  filterForm: FormGroup;
  settingsForm: FormGroup;
  partners: any = [];
  filteredPartners: any = [];
  employeeObservable: Observable<any>;
  isInviting = false;
  isPartnerSelected = false;
  isInvitingPartnerSelected = false;
  isInvitedPartnerSelected = false;
  isBlockedPartnerSelected = false;
  config = kobipConfig;
  sortParam: 'asc' | 'desc' = 'asc';
  filterTerm = new FormControl();
  filterCountryTerm = new FormControl();
  filterCountryIds: string[] = [];
  invitationStatusEnum = invitationStatus;

  constructor(private _nf: KbNotificationService,
              private _translate: TranslateService,
              private _http: KbHttpService,
              private _fb: FormBuilder,
              private _fix: KbFixDataService) {
    super();
  }

  blockedPartners() {
    const value = this.isBlockedPartnerSelected;
    this.unCheckedAll();
    this.isBlockedPartnerSelected = !value;
    this.filter({isBlockedPartnerSelected: this.isBlockedPartnerSelected});
  }

  getScore(kobipScore: number, customerScore: number): number {
    if (isNullOrUndefined(kobipScore) || kobipScore === 0) {
      return 0;
    }
    if (isNullOrUndefined(customerScore) || customerScore === 0) {
      return kobipScore;
    }
    return (kobipScore + customerScore) / 2;
  }

  initFilterForm() {
    this.filterForm = this._fb.group({
      searchQuery: [''],
      country: [null],
      sort: [true],
    });
  }

  initInviteForm() {
    this.inviteForm = this._fb.group({
      isInvitorPhoneVisible: [false],
      isInvitorMailVisible: [false],
      isInvitorAddressVisible: [false],
      //  idInvitedCompany: [0],
      IdInvetorCompanyAssigneeEmployee: [null],
      invitedMail: [null, Validators.required]
    });
  }

  initPartners() {
    this.showLoading(false);
    this.loadPartnerObservable().subscribe(res => this.hideLoading());
  }

  initSettingsForm() {
    this.settingsForm = this._fb.group({
      isInvitorPhoneVisible: [false],
      isInvitorMailVisible: [false],
      isInvitorAddressVisible: [false],
      IdInvetorCompanyAssigneeEmployee: [null],
    });
  }

  invitedPartners() {
    const value = this.isInvitedPartnerSelected;
    this.unCheckedAll();
    this.isInvitedPartnerSelected = !value;
    this.filter({isInvitedPartnerSelected: this.isInvitedPartnerSelected});
  }

  invitingPartners() {
    const value = this.isInvitingPartnerSelected;
    this.unCheckedAll();
    this.isInvitingPartnerSelected = !value;
    this.filter({isInvitingPartnerSelected: this.isInvitingPartnerSelected});
  }

  ngOnInit(): void {
    this.initInviteForm();
    this.initSettingsForm();
    this.initFilterForm();
    //  this.initCurrentCompanyInfo();
    this.initEmployee();
    this.initPartners();
    this.initalizeFilter();
  }

  onApprove(partner: any) {
    this._http.post(partner, `CompanyPartner/Approve`).subscribe(res => {
      this._nf.showKobipResultMessage(res);
      if (res.isSuccess) {
        this.initPartners();
      }
    });
  }


  // onBan(partner: any) {
  // }


  onChangeAssigneeEmployee(idAssigneeEmployee, partner: any) {
    partner.IdInvetedCompanyAssigneeEmployee = idAssigneeEmployee;
    partner.idAssigneeEmployee = idAssigneeEmployee;
    if (partner.isInvitedByMe) {
      this._http.post({
        idAssigneeEmployee: partner.idAssigneeEmployee,
        isInvetor: true
      }, `CompanyPartner/${partner.id}/AssigneeEmployee`)
        .subscribe(res => {
          if (!res.isSuccess) {
            this._nf.showKobipResultMessage(res);
          }
        });
    } else if (partner.idInvitationStatus === this.invitationStatusEnum.accepted) {
      this._http.post({
        idAssigneeEmployee: partner.idAssigneeEmployee,
        isInvetor: false
      }, `CompanyPartner/${partner.id}/AssigneeEmployee`)
        .subscribe(res => {
          if (!res.isSuccess) {
            this._nf.showKobipResultMessage(res);
          }
        });
    }
  }

  onClickInvitePartner() {
    this.isInviting = true;
    this.showLoading();
    this._http.post(this._fix.fix(this.inviteForm.value), 'CompanyPartner').subscribe(res => {
      this.isInviting = false;
      this._nf.showKobipResultMessage(res);
      if (res.isSuccess === true) {
        this.loadPartnerObservable().subscribe();
      } else {
        this.hideLoading();
      }
    });
  }

  onClickInviteVisibility(form: FormGroup, param: string) {
    const val: boolean = !form.get(param).value;
    const patchValue = {};
    patchValue[param] = val;
    form.patchValue(patchValue);
    // this.invetedCompany[param] = !this.invetedCompany[param];
  }

  onRemove(partner: any) {
    this._nf.removeConfirmObservable(() => {
      return this._http.delete('CompanyPartner', partner.id, this.getLoading());
    }, this.initPartners.bind(this));
  }

  onToggleAddress(partner: any): void {
    this.toggleSettingVisibility(partner, 'Address');
  }

  onToggleMail(partner: any): void {
    this.toggleSettingVisibility(partner, 'Mail');
  }

  onTogglePhone(partner: any): void {
    this.toggleSettingVisibility(partner, 'Phone');
  }

  removeFilter() {
    this.unCheckedAll();
    this.filterTerm.patchValue('');
    this.filterCountryTerm.patchValue(null);
    this.filter({});
  }

  showPartners() {
    const value = this.isPartnerSelected;
    this.unCheckedAll();
    this.isPartnerSelected = !value;
    this.filter({isPartnerSelected: this.isPartnerSelected});
  }

  showSettingAddressVisibility(partner: any) {
    if (partner.isInvitedByMe === true) {
      return partner.isInvitorAddressVisible;
    } else {
      return partner.isInvitedAddressVisible;
    }
  }

  showSettingMailVisibility(partner: any) {
    if (partner.isInvitedByMe === true) {
      return partner.isInvitorMailVisible;
    } else {
      return partner.isInvitedMailVisible;
    }
  }

  showSettingPhoneVisibility(partner: any) {
    if (partner.isInvitedByMe === true) {
      return partner.isInvitorPhoneVisible;
    } else {
      return partner.isInvitedPhoneVisible;
    }
  }

  toggleInfo(id: number) {
    const panel: JQuery = jQuery('#partner-info-' + id);
    if (panel.css('display') === 'none') {
      panel.show(300);
    } else {
      panel.hide(300);
    }
  }

  toggleSettings(id: number) {
    const panel: JQuery = jQuery('#partner-settings-' + id);
    if (panel.css('display') === 'none') {
      panel.show(300);
    } else {
      panel.hide(300);
    }
  }

  toggleSort() {
    this.sortParam = this.sortParam === 'desc' ? 'asc' : 'desc';
    this.sort();
  }

  getSelectedCategoryDisplayHtml(item: string): string {
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

  private filter(values: IPartnerSearchModel) {
    if (isNullOrUndefined(values.searchQuery)) {
      values.searchQuery = this.filterTerm.value;
    }

    if (isNullOrUndefined(values.country)) {
      values.country = this.filterCountryTerm.value;
    }

    if (isNullOrUndefined(values.isPartnerSelected)) {
      values.isPartnerSelected = this.isPartnerSelected;
    }

    if (isNullOrUndefined(values.isInvitingPartnerSelected)) {
      values.isInvitingPartnerSelected = this.isInvitingPartnerSelected;
    }

    if (isNullOrUndefined(values.isInvitedPartnerSelected)) {
      values.isInvitedPartnerSelected = this.isInvitedPartnerSelected;
    }

    if (isNullOrUndefined(values.isBlockedPartnerSelected)) {
      values.isBlockedPartnerSelected = this.isBlockedPartnerSelected;
    }

    this.filterSearhQuery(values.searchQuery).subscribe(queryFilter => {
      this.filteredPartners = queryFilter;
      this.filterCountry(values.country).subscribe(countryFilter => {
        this.filteredPartners = countryFilter;
        this.filterInvitedOrInvitingOrBanned(values).subscribe(inviteBlocked => {
          this.filteredPartners = inviteBlocked;
          this.sort();
        });
      });
    });
  }

  private filterCountry(idCountry): Observable<any> {
    if (isNullOrUndefined(idCountry) || idCountry === 'null') {
      return Observable.of(this.filteredPartners);
    }
    return Observable.of(this.filteredPartners.filter(item => {
      return (!isNullOrUndefined(item.idCountry) && item.idCountry === idCountry);
    }));
  }

  private filterInvitedOrInvitingOrBanned(values: IPartnerSearchModel): Observable<any> {
    return Observable.create(promise => {
      if (values.isPartnerSelected) {
        promise.next(this.filteredPartners.filter(item => {
          return item.idInvitationStatus === this.invitationStatusEnum.accepted;
        }));
      } else if (values.isInvitingPartnerSelected) {
        promise.next(this.filteredPartners.filter(item => {
          return item.idInvitationStatus !== this.invitationStatusEnum.accepted
            && item.isInvitedByMe === false;
        }));
      } else if (values.isInvitedPartnerSelected) {
        promise.next(this.filteredPartners.filter(item => {
          return item.idInvitationStatus !== this.invitationStatusEnum.accepted
            && item.isInvitedByMe === true;
        }));
      } else if (values.isBlockedPartnerSelected) {
        promise.next(this.filteredPartners.filter(item => {
          return item.isPartnerBlocked === this.isBlockedPartnerSelected;
        }));
      } else {
        promise.next(this.filteredPartners);
      }
      promise.complete();
    });
  }

  private filterSearhQuery(searchQuery): Observable<any> {
    return Observable.of(this.partners.filter(item => {
      const patern = isNullOrUndefined(searchQuery) ? '' : searchQuery.toLocaleUpperCase();
      return (!isNullOrUndefined(item.localName) && item.localName.toLocaleUpperCase().indexOf(patern) !== -1) ||
        (!isNullOrUndefined(item.internationalAddress) && item.internationalAddress.toLocaleUpperCase().indexOf(patern) !== -1) ||
        (!isNullOrUndefined(item.internationalAddress2) && item.internationalAddress2.toLocaleUpperCase().indexOf(patern) !== -1) ||
        (!isNullOrUndefined(item.intCityName) && item.intCityName.toLocaleUpperCase().indexOf(patern) !== -1) ||
        (!isNullOrUndefined(item.invitedMail) && item.invitedMail.toLocaleUpperCase().indexOf(patern) !== -1);
    }));
  }

  private initEmployee() {
    this.employeeObservable = this._http.get('Employee/Combo').map(res => {
      if (res.isSuccess) {
        return res.data;
      } else {
        // TODO employee çekilemez ise uyarı ver
        return [];
      }
    });
  }

  private initalizeFilter() {
    this.filterTerm.valueChanges.subscribe(data => {
      this.filter({searchQuery: data});
    });

    this.filterCountryTerm.valueChanges.subscribe(data => {
      this.filter({country: data});
    });
  }

  private loadPartnerObservable(): Observable<any> {
    return this._http.get('CompanyPartner/Partner').map(res => {
      this.hideLoading();
      if (res.isSuccess) {
        this.partners = res.data;
        this.filteredPartners = deepCopyArray(res.data);
        const countries = groupBy(res.data, 'idCountry');
        for (const prop in countries) {
          if (countries.hasOwnProperty(prop)) {
            if (prop !== 'null') {
              this.filterCountryIds.push(prop);
            }
          }
        }
        this.toggleSort();
      } else {
        this._nf.showKobipResultMessage(res);
      }
    });
  }

  private sort() {
    this.partners = sortBy(this.partners, {
      prop: 'localName',
      desc: this.sortParam === 'desc',
      parser: (t) => isNullOrUndefined(t) ? '' : t.toLocaleUpperCase()
    });

    this.filteredPartners = sortBy(this.filteredPartners, {
      prop: 'localName',
      desc: this.sortParam === 'desc',
      parser: (t) => isNullOrUndefined(t) ? '' : t.toLocaleUpperCase()
    });
  }

  private toggleSettingVisibility(partner: any, key: string) {
    if (partner.isInvitedByMe) {
      partner[`isInvitor${key}Visible`] = !partner[`isInvitor${key}Visible`];
      this._http.post({
        status: partner[`isInvitor${key}Visible`],
        isInvetor: true
      }, `CompanyPartner/${partner.id}/${key}Visibility`)
        .subscribe(res => {
          if (!res.isSuccess) {
            this._nf.showKobipResultMessage(res);
          }
        });
    } else {
      if (partner.idInvitationStatus === this.invitationStatusEnum.accepted) {
        partner[`isInvited${key}Visible`] = !partner[`isInvited${key}Visible`];
        this._http.post({
          status: partner[`isInvited${key}Visible`],
          isInvetor: false
        }, `CompanyPartner/${partner.id}/${key}Visibility`)
          .subscribe(res => {
            if (!res.isSuccess) {
              this._nf.showKobipResultMessage(res);
            }
          });
      } else {
        partner[`isInvited${key}Visible`] = !partner[`isInvited${key}Visible`];
      }
    }
  }

  private unCheckedAll() {
    this.isPartnerSelected = false;
    this.isInvitedPartnerSelected = false;
    this.isInvitingPartnerSelected = false;
    this.isBlockedPartnerSelected = false;
  }
}
