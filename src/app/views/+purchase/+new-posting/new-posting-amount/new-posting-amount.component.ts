import { Component, ElementRef, forwardRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { KbEnumService } from '../../../../shared/services/enum/enum.service';
import { Observable } from 'rxjs/Observable';
import { EnumModel } from '../../../../shared/services/enum/enum.model';
import { PostingBrandModel, PostingDetailModel } from '../new-posting.model';
import { KbFormBuilder } from '../../../../shared/services/form-builder/form-builder.service';
import { KbNotificationService } from '../../../../shared/services/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined } from 'util';
import { deepCopy } from '../../../../shared/services/util/util';
import { KbLoggerService } from '../../../../shared/services/log/logger.service';

declare const $: any;

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NewPostingAmountComponent),
  multi: true
};

@Component({
  selector: 'kb-new-posting-amount',
  template: `<b *ngIf="!isEdit" (click)="onClick()" title="Adet">{{value | translate}}</b>
  <select style="background-color: #FFFFFF;
    background-image: none;
    border: 1px solid #e5e6e7;
    border-radius: 1px;
    color: inherit;
    display: block;
    padding: 6px 12px;
    outline: none;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;"
          [formControl]="term"
          [style.display]="isEdit ? 'inline-block': 'none'"
          (blur)="onBlur()">
    <option *ngFor="let option of observableUnit | async"
            [value]="option.id">{{ option.display | translate }}
    </option>
  </select>`,
  providers: [VALUE_ACCESSOR]
})
export class NewPostingAmountComponent implements OnInit, ControlValueAccessor {

  term = new FormControl();
  observableUnit: Observable<EnumModel[]>;
  isEdit = false;
  value = 'Birim';
  onChangeCallback: any = () => {
  }

  constructor(private _log: KbLoggerService, private _el: ElementRef, private _enum: KbEnumService) {
  }

  ngOnInit(): void {
    this._log.debug('NewPostingAmountComponent was initializing');
    this.observableUnit = this._enum.unit();
    this.term.valueChanges.subscribe(value => {
      if (value) {
        this.value = value;
      }
      this.onChangeCallback(value);
    });
  }

  onBlur() {
    if (this.isEdit === true) {
      this.isEdit = false;
    }
  }

  onClick() {
    if (this.isEdit === false) {
      this.isEdit = true;
      const select = this._el.nativeElement.querySelector('select');
      if (select) {
        setTimeout(() => select.focus(), 50);
      }
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    }
  }
}


