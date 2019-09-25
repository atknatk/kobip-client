import { Attribute, Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs/util/noop';
import { isNullOrUndefined } from 'util';

declare var jQuery: any;

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => KbCheckIconComponent),
  multi: true
};

@Component({
  selector: 'kb-check-icon',
  template: `
    <i [ngClass]="value === true ? getReverseClass() : icon"
       (click)="toogleValue()"
       tooltip="{{tooltip}}"></i>
  `,
  providers: [VALUE_ACCESSOR]
})
export class KbCheckIconComponent implements ControlValueAccessor, OnInit {

  @Input() tooltip: string;
  @Input() icon: string;
  @Input() reverseIcon: string;
  private innerValue: any = false;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor(@Attribute('formControlName') public formControlName: string) {

  }

  get value(): any {
    return this.innerValue;
  }

  @Input()
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  getReverseClass() {
    if (isNullOrUndefined(this.reverseIcon)) {
      return 'fa fa-check-square-o';
    } else {
      return this.reverseIcon;
    }
  }

  ngOnInit(): void {
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  toogleValue() {
    this.value = !this.innerValue;
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

}
