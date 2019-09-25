import { AfterViewInit, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { kobipRoles } from '../../enums/kobip.roles';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs/util/noop';

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => KbAuthViewEditComponent),
  multi: true
};

@Component({
  selector: 'kb-auth-roles-edit',
  template: `
    <br>
    <div class="row kb yetki1" [formGroup]="form">
      <div class="col-md-4">
        <label>
          <input formControlName="companyInfoEdit"
                 type="checkbox"/>{{'auth.roles.companyInfoEdit' | translate}}</label><br>
        <label>
          <input formControlName="employeeView"
                 type="checkbox">{{'auth.roles.employeeView' | translate}}</label><br>
        <label>
          <input formControlName="employeeEdit"
                 type="checkbox">{{'auth.roles.employeeEdit' | translate}}</label><br>
        <label>
          <input formControlName="partnerView"
                 type="checkbox">{{'auth.roles.partnerView' | translate}}</label><br>
        <label>
          <input formControlName="partnerEdit"
                 type="checkbox">{{'auth.roles.partnerEdit' | translate}}</label><br>
        <label>
          <input formControlName="categoryEdit"
                 type="checkbox">{{'auth.roles.categoryEdit' | translate}}</label><br>
        <label>
          <input formControlName="expanseView"
                 type="checkbox">{{'auth.roles.expanseView' | translate}}</label><br>
        <label>
          <input formControlName="expanseEdit"
                 type="checkbox">{{'auth.roles.expanseEdit' | translate}}</label><br>
      </div>
      <div class="col-md-4">
        <label>
          <input formControlName="purchasingPostingView"
                 type="checkbox">{{'auth.roles.purchasingPostingView' | translate}}</label><br>
        <label>
          <input formControlName="purchasingPostingEdit"
                 type="checkbox">{{'auth.roles.purchasingPostingEdit' | translate}}</label>
      </div>
      <div class="col-md-4">
        <label>
          <input formControlName="salesPostingView"
                 type="checkbox">{{'auth.roles.salesPostingView' | translate}}</label><br>
        <label>
          <input formControlName="offerToSalesPostingInfo"
                 type="checkbox">{{'auth.roles.offerToSalesPostingInfo' | translate}}</label><br>
        <label>
          <input formControlName="salesPostinEdit"
                 type="checkbox">{{'auth.roles.salesPostinEdit' | translate}}</label>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    label {
      font-weight: normal;
    }

    input {
      margin-right: 8px;
    }`
  ],
  providers: [VALUE_ACCESSOR]
})
export class KbAuthViewEditComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  kobipRoles = kobipRoles;
  form: FormGroup;
  @Input() grantedRoles: any[] = [];
  @Output() valueChange: EventEmitter<number[]> = new EventEmitter();
  private innerValue: number[] = [];
  private onChangeCallback: (_: any) => void = noop;

  constructor(private _fb: FormBuilder) {

  }


  isAuthorized(id: number) {
    if (isNullOrUndefined(this.grantedRoles)) {
      return false;
    }
    const filtered = this.grantedRoles.filter(item => item == id);
    return filtered.length > 0;
  }

  ngAfterViewInit(): void {
    this.initValues();
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      companyInfoEdit: [false],
      employeeView: [false],
      employeeEdit: [false],
      partnerView: [false],
      partnerEdit: [false],
      categoryEdit: [false],
      expanseView: [false],
      expanseEdit: [false],
      purchasingPostingView: [false],
      purchasingPostingEdit: [false],
      salesPostingView: [false],
      offerToSalesPostingInfo: [false],
      salesPostinEdit: [false]
    });

    this.form.valueChanges.subscribe(value => this.getValue(value));
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(value: any): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  private getValue(value) {
    const ids = [];
    for (const prop in value) {
      if (value.hasOwnProperty(prop)) {
        if (value[prop] === true) {
          ids.push(kobipRoles[prop]);
        }
      }
    }
    this.valueChange.emit(ids);
  }

  private initValues() {
    const values = {};
    for (const prop in kobipRoles) {
      if (kobipRoles.hasOwnProperty(prop)) {
        values[prop] = this.grantedRoles.indexOf(kobipRoles[prop] + '') !== -1;
      }
    }
    this.form.patchValue(values);
  }


}
