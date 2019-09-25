import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { isArray, isNullOrUndefined } from 'util';
import { kobipRoles } from '../../enums/kobip.roles';
import { KbHttpService } from '../../services/http/http.service';
import { KbStorageService } from '../../services/storage/storage.service';
import { kobipConfig } from '../../kobip.config';
import { KbAuthUser } from '../../../model/auth-user';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { KbLoggerService } from '../../services/log/logger.service';
import { deepCopyArray } from '../../services/util/util';
import { isBefore } from 'ngx-bootstrap/bs-moment/utils/date-compare';

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => KbTransportTypeComponent),
  multi: true
};

@Component({
  selector: 'kb-transport-type',
  template: `
    <i class="fa fa-ship kb personal-delivery-icon edit"
       [class.active]="transportType.indexOf('zz.transportationType.seaway') !== -1"
       (click)="toggleTransportType('zz.transportationType.seaway')">
    </i>
    <i class="fa fa-truck kb personal-delivery-icon edit"
       [class.active]="transportType.indexOf('zz.transportationType.road') !== -1"
       (click)="toggleTransportType('zz.transportationType.road')"></i>
    <i class="fa fa-plane kb personal-delivery-icon edit"
       [class.active]="transportType.indexOf('zz.transportationType.airway') !== -1"
       (click)="toggleTransportType('zz.transportationType.airway')"></i>
  `,
  providers: [VALUE_ACCESSOR]
})
export class KbTransportTypeComponent implements ControlValueAccessor, OnInit {

  transportType: string[] = [];
  onChangeCallback: any = () => {
  }

  constructor(private _log: KbLoggerService) {

  }

  ngOnInit(): void {
    this._log.debug('KbTransportTypeComponent was initializing');
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
  }

  toggleTransportType(id: string) {
    const index: number = this.transportType.indexOf(id);
    if (this.transportType.indexOf(id) === -1) {
      this.transportType.push(id);
    } else {
      this.transportType.splice(index, 1);
    }
    this.onChangeCallback(this.transportType);
  }

  writeValue(value: any): void {
    if (value && isArray(value)) {
      this.transportType = value;
    }
  }
}
