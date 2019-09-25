import { Component, OnInit } from '@angular/core';
import { KbHttpService } from '../../../shared/services/http/http.service';
import { Observable } from 'rxjs/Observable';
import { KbNotificationService } from '../../../shared/services/notification/notification.service';
import { KbEnumService } from '../../../shared/services/enum/enum.service';
import { EnumModel } from '../../../shared/services/enum/enum.model';
import { TranslateService } from '@ngx-translate/core';
import { KbLoadingBase } from '../../../components/loading/loading.base';
import { kobipConfig } from '../../../shared/kobip.config';

declare const jQuery: any;

@Component({
  templateUrl: 'employee.component.html'
})
export class EmployeeComponent extends KbLoadingBase implements OnInit {
  employees: any[];
  invitedEmployeesObservable: Observable<any[]>;
  inivetedEmployee: any = {};
  kobipConfig = kobipConfig;
  companyUserCategoryObservable: Observable<EnumModel[]>;

  constructor(private _http: KbHttpService,
              private _nf: KbNotificationService,
              private _enum: KbEnumService,
              private _translate: TranslateService) {
    super();
  }

  getInviterDisplay(invitedEmployee: any) {

    this._translate.get('invitation', {
      employee: `${invitedEmployee.invitorName} ${invitedEmployee.invitorSurname}`
    });

  }

  inviteEmployee() {
    this._http.post(this.inivetedEmployee, 'InvitedEmployee/InviteEmployee', {loadingBase: this})
      .subscribe(value => {
        this._nf.showKobipResultMessage(value);
      });
  }

  ngOnInit(): void {
    this.loadData();
    this.loadInvitedEmployees();
    this.companyUserCategoryObservable = this._enum.companyUserCategory();
  }

  onChangeDepartmant(value, idx) {
    this.employees[idx].idCompanyUserCategory = value;
  }

  onChangeInviteEmployee(value) {
    this.inivetedEmployee.mail = value;
  }

  onChangeInvitedDepartmant(value) {
    this.inivetedEmployee.idCompanyUserCategory = value;
  }

  roleChanged(value, idx) {
    this.employees[idx].idRoleList = value;
  }

  roleInvitedChanged(value) {
    this.inivetedEmployee.roleGroupList = value;
  }

  toggleSettings(id: number) {
    const panel: JQuery = jQuery('#employee-settings-' + id);
    if (panel.css('display') === 'none') {
      panel.show(300);
    } else {
      panel.hide(300);
    }
  }

  updateEmployee(idx) {
    const body = {
      id: this.employees[idx].id,
      idRoleList: this.employees[idx].idRoleList,
      idCompanyUserCategory: this.employees[idx].idCompanyUserCategory,
    };
    this._http.post(body, `Employee/${this.employees[idx].id}/Role`, {loadingBase: this})
      .subscribe(value => this._nf.showKobipResultMessage(value));
  }

  private assignLanguagesObject(employees: any[], languages: EnumModel[]) {
    for (let i = 0; i < employees.length; i++) {
      const employee = employees[i];
      if (employee.employeeLanguageList) {
        const employeeLanguageList = employee.employeeLanguageList;
        for (let z = 0; z < employeeLanguageList.length; z++) {
          const employeeLanguage = employee.employeeLanguageList[z];
          for (let k = 0; k < languages.length; k++) {
            if (languages[k].id === employeeLanguage) {
              employee.employeeLanguageList[z] = languages[k].display;
            }
          }
        }
      }
    }
    return employees;
  }

  private loadData() {
    const task$ = [];
    task$.push(this.loadEmployees());
    task$.push(this._enum.language());
    // task$.push(this._enum.companyUserCategory());
    this.loading = true;
    Observable.forkJoin(...task$).subscribe((results: any[]) => {
      this.loading = false;
      this.employees = this.assignLanguagesObject(results[0], results[1]);
    });
  }

  private loadEmployees() {
    return this._http.get('Employee/Simple').map(res => {
      if (res.isSuccess) {
        return res.data;
      } else {
        this._nf.showKobipResultMessage(res);
        return [];
      }
    });
  }

  private loadInvitedEmployees() {
    this.invitedEmployeesObservable = this._http.get('Employee/InvitedEmployee').map(res => {
      if (res.isSuccess) {
        return res.data;
      } else {
        this._nf.showKobipResultMessage(res);
        return [];
      }
    });
  }

}
