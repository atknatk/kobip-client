import { Component, Input, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { kobipRoles } from '../../enums/kobip.roles';
import { KbHttpService } from '../../services/http/http.service';
import { KbStorageService } from '../../services/storage/storage.service';
import { kobipConfig } from '../../kobip.config';
import { KbAuthUser } from '../../../model/auth-user';

@Component({
  selector: 'kb-auth-roles',
  template: `
    <div class="row show-grid kb yetki1">
      <div class="col-sm-4">
        <ul>
          <li [class.kb-yetki-ok]="isAuthorized(kobipRoles.companyInfoEdit)" translate>auth.roles.companyInfoEdit</li>
          <li [class.kb-yetki-ok]="isAuthorized(kobipRoles.employeeView)" translate>auth.roles.employeeView</li>
          <li [class.kb-yetki-ok]="isAuthorized(kobipRoles.employeeEdit)" translate>auth.roles.employeeEdit</li>
          <li [class.kb-yetki-ok]="isAuthorized(kobipRoles.partnerView)" translate>auth.roles.partnerView</li>
          <li [class.kb-yetki-ok]="isAuthorized(kobipRoles.partnerEdit)" translate>auth.roles.partnerEdit</li>
          <li [class.kb-yetki-ok]="isAuthorized(kobipRoles.categoryEdit)" translate>auth.roles.categoryEdit</li>
          <li [class.kb-yetki-ok]="isAuthorized(kobipRoles.expanseView)" translate>auth.roles.expanseView</li>
          <li [class.kb-yetki-ok]="isAuthorized(kobipRoles.expanseEdit)" translate>auth.roles.expanseEdit</li>
        </ul>
      </div>
      <div class="col-sm-4">
        <ul>
          <li [class.kb-yetki-ok]="isAuthorized(kobipRoles.purchasingPostingView)" translate>
            auth.roles.purchasingPostingView
          </li>
          <li [class.kb-yetki-ok]="isAuthorized(kobipRoles.purchasingPostingEdit)" translate>
            auth.roles.purchasingPostingEdit
          </li>
        </ul>
      </div>
      <div class="col-sm-4">
        <ul>
          <li [class.kb-yetki-ok]="isAuthorized(kobipRoles.salesPostingView)" translate>auth.roles.salesPostingView</li>
          <li [class.kb-yetki-ok]="isAuthorized(kobipRoles.offerToSalesPostingInfo)" translate>
            auth.roles.offerToSalesPostingInfo
          </li>
          <li [class.kb-yetki-ok]="isAuthorized(kobipRoles.salesPostinEdit)" translate>auth.roles.salesPostinEdit</li>
        </ul>
      </div>
    </div>
  `
})
export class KbAuthViewComponent implements OnInit {

  kobipRoles = kobipRoles;
  @Input() grantedRoles: number[] = [];
  @Input() employeeId: number = NaN;

  constructor(private _http: KbHttpService,
              private _storage: KbStorageService) {

  }

  isAuthorized(id: number) {
    if (isNullOrUndefined(this.grantedRoles)) {
      return false;
    }
    const filtered = this.grantedRoles.filter(item => item === id);
    return filtered.length > 0;
  }

  ngOnInit(): void {
    if (!isNaN(this.employeeId)) {
      this._http.get(`Employee/${this.employeeId}/Role`).subscribe(res => {
        if (res.isSuccess) {
          this.grantedRoles = res.data;
        }
      });
    } else {
      this.grantedRoles = (this._storage.getItem(kobipConfig.authUserKey) as KbAuthUser).roleList;
    }
  }


}
