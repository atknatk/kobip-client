import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { KbLoggerService } from '../shared/services/log/logger.service';

@Directive({
  selector: '[kbEditable]'
})
export class ContentEditableDirective implements OnInit, OnChanges, AfterViewInit {
  @Input('ceForm') form: FormGroup;
  @Input('ceFormControlName') formControlName: string;
  @Input('number') number = false;
  @Input('ceFormArrayName') formArrayName: string;
  @Input('ceFormGroupName') formGroupName: string;

  constructor(private elRef: ElementRef,
              private _log: KbLoggerService) {
  }

  ngAfterViewInit(): void {
    this._log.debug('kbEditable is initialized FormControlName:', this.formControlName);
    const control: AbstractControl = this.getFormGroup().get(this.formControlName);
    if (control) {
      control.valueChanges.subscribe(value => {
        this.elRef.nativeElement.innerText = value;
      });
    }
  }

  ngOnChanges(changes) {
    this.refreshView();
  }

  ngOnInit(): void {
    this._log.debug('kbEditable is initializing FormControlName:', this.formControlName);
    if (isNullOrUndefined(this.form)) {
      this._log.error('ceForm can not be empty');
    }
  }

  @HostListener('blur')
  onBlur() {
    let value = this.elRef.nativeElement.innerText;
    if (this.number === true) {
      value = value.replace(/\D/g, '');
      this.elRef.nativeElement.innerText = value;
    }
    this.getFormGroup().patchValue({[this.formControlName]: value}, {emitEvent: false});
  }

  @HostListener('click')
  onClick() {
    if (this.elRef.nativeElement.innerText === '') {
      this.elRef.nativeElement.innerText = '';
    }
  }

  private getFormGroup(): FormGroup {
    if (isNullOrUndefined(this.formArrayName)) {
      return this.form;
    } else {
      if (isNullOrUndefined(this.formGroupName)) {
        this._log.error('ceFormGroupName can not be empty');
        return;
      }
      const array = this.form.get(this.formArrayName) as FormArray;
      return array.controls[this.formGroupName] as FormGroup;
    }
  }

  private refreshView() {
    const control: AbstractControl = this.getFormGroup().get(this.formControlName);
    if (control) {
      this.elRef.nativeElement.innerText = control.value;
    }

  }
}
