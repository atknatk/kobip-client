import { Attribute, Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs/util/noop';
import { isNullOrUndefined } from 'util';

declare var jQuery: any;

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => KbInputComponent),
  multi: true
};

@Component({
  selector: 'kb-input',
  template: `
    <div class="form-group"
         [class.has-error]="hasError(formControlName)">
      <input #termInput
             [formControl]="term"
             required
             type="text"
             class="form-control"
             [placeholder]="placeholder"
             [attr.validateEqual]="'test'"
             [(ngModel)]='value'>
      <label *ngIf="hasError(formControlName)" class="error" style="float: left">This field is required.</label>
    </div>
  `,
  providers: [VALUE_ACCESSOR]
})
export class KbInputComponent implements ControlValueAccessor, OnInit {

  @Input() form: FormGroup;
  @Input() placeholder: string;
  @Input() kbValidation: any;
  term = new FormControl();
  @ViewChild('termInput') private termInput;
  private innerValue: any = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  private formControl: AbstractControl;


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

  ngOnInit(): void {
    if (isNullOrUndefined(this.form) || isNullOrUndefined(this.formControlName)) {
      return;
    }

    if (isNullOrUndefined(this.form.controls[this.formControlName])) {
      this.form.addControl(this.formControlName, new FormControl(null));
    }
    this.formControl = this.form.get(this.formControlName);
  }


  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  /**
   * Verilen formControlName eğer hatalı ve input'a hiç kullanıcı tarafından dokunulmuş ise true döner.
   * @param {string} formControlName
   * @returns {boolean}
   */
  hasError(formControlName: string): boolean {
    return !this.term.valid && this.term.touched;
  }

  getValidation(): string | undefined {
    if (this.kbValidation) {
      return this.kbValidation[this.formControlName];
    }
  }

}
