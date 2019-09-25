import { Attribute, Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs/util/noop';
import { isNullOrUndefined } from 'util';
import { KbHttpService } from '../../shared/services/http/http.service';
import { TranslateService } from '@ngx-translate/core';
import { EnumModel } from '../../shared/services/enum/enum.model';
import { Observable } from 'rxjs/Observable';
import { KbResultDataBase } from '../../shared/services/http/http-result.model';

declare var $: any;


@Component({
  selector: 'kb-duallist',
  template: `
    <div class="bootstrap-duallistbox-container row moveonselect">
      <div class="box1 col-md-6">
        <span class="info-container">
          <label *ngIf="isLeftFiltered" class="label label-warning" translate>app.general.filtered</label>
          <span class="info">{{leftFilterMessage}}</span>
          <button *ngIf="isLeftFiltered"
                  type="button"
                  (click)="leftShowAll()"
                  class="btn clear1 pull-right btn-default btn-xs"
                  translate>app.general.showAll</button>
        </span>
        <input class="filter form-control"
               [formControl]="leftFilterTerm"
               style="margin-top: 10px;"
               placeholder="{{'app.general.filter' | translate}}"
               type="text">
        <button type="button" style="width: 100%"
                (click)="selectAllLeftList()"
                class="btn moveall btn-default">
          <i class="glyphicon glyphicon-arrow-right"></i>
          <i class="glyphicon glyphicon-arrow-right"></i>
        </button>
        <select multiple="multiple"
                class="form-control"
                (change)="selectLeftList($event.target.selectedOptions)"
                style="height: 162px; overflow-y: auto;">
          <optgroup disabled hidden></optgroup>
          <option *ngFor="let item of leftFilteredList" value="{{ item | json}}">
            {{item.display}}
          </option>
        </select>
      </div>
      <div class="box2 col-md-6">
        <span class="info-container">
          <label *ngIf="isRightFiltered" class="label label-warning" translate>app.general.filtered</label>
          <span class="info">{{rightFilterMessage}}</span>
          <button *ngIf="isRightFiltered"
                  type="button"
                  (click)="rightShowAll()"
                  class="btn clear2 pull-right btn-default btn-xs"
                  translate>app.general.showAll</button>
        </span>
        <input class="filter form-control"
               [formControl]="rightFilterTerm"
               style="margin-top: 10px;"
               placeholder="{{'app.general.filter' | translate}}"
               type="text">
        <button type="button"
                (click)="selectAllRightList()"
                style="width: 100%;"
                class="btn removeall btn-default" title="Remove all">
          <i class="glyphicon glyphicon-arrow-left"></i>
          <i class="glyphicon glyphicon-arrow-left"></i>
        </button>
        <select multiple="multiple"
                class="form-control"
                name="_helper2"
                style="height: 162px; overflow-y: auto;">
          <option *ngFor="let item of rightFilteredList"
                  (click)="selectRightList(item)">
            {{ item.display }}
          </option>
        </select>
      </div>
    </div>
  `,
})
export class KbDuallistComponent implements OnInit {


  leftFilterTerm = new FormControl();
  leftFilterMessage = '';
  leftFilteredList = [];
  isLeftFiltered = false;
  isRightFiltered = false;

  rightFilterMessage = '';
  rightList = [];
  rightFilteredList = [];
  rightFilterTerm = new FormControl();
  @Input() leftList = [];
  @Output('selectedListChangedEvent') selectedListChangedEvent: EventEmitter<EnumModel[]> = new EventEmitter<EnumModel[]>();
  @Output('loadedDataEvent') loadedDataEvent: EventEmitter<EnumModel[]> = new EventEmitter<EnumModel[]>();
  @Input() serviceUrl: string;
  @Input() loadObservable: Observable<any>;
  @Input() keyPrefix = '';

  constructor(private _http: KbHttpService,
              private _translate: TranslateService) {

  }

  changeLeftMessage(data) {
    if (data === '') {
      this.isLeftFiltered = false;
      this._translate.get('app.paginglist.all', {param: this.leftList.length})
        .subscribe(message => {
          this.leftFilterMessage = message;
        });
    } else {
      this.isLeftFiltered = true;
      this._translate.get('app.paginglist.filtered', {
        total: this.leftList.length,
        filtered: this.leftFilteredList.length
      }).subscribe(message => {
        this.leftFilterMessage = message;
      });
    }
  }

  leftShowAll() {
    this.leftFilterTerm.patchValue('');
  }

  ngOnInit(): void {
    this.loadData();
    this.initLeftFilteredListSubscribe();
    this.initRightFilteredListSubscribe();
    this.changeLeftMessage('');
    this.changeRightMessage('');
  }

  rightShowAll() {
    this.rightFilterTerm.patchValue('');
  }

  selectAllLeftList() {
    setTimeout(() => {
      const cloned = $.extend(true, [], this.leftFilteredList);
      this.selectLeftList(cloned);
    }, 0);
  }

  selectAllRightList() {
    setTimeout(() => {
      const cloned = $.extend(true, [], this.rightFilteredList);
      for (let i = 0; i < cloned.length; i++) {
        this.selectRightList(cloned[i]);
      }
    }, 0);
  }

  selectLeftList(items) {
    for (let i = 0; i < items.length; i++) {
      let item;
      if (typeof items[i].value === 'string') {
        item = JSON.parse(items[i].value);
      } else {
        item = items[i];
      }

      this.leftList = this.removeArray(this.leftList, item);
      this.leftFilteredList = this.removeArray(this.leftList, item);
      this.rightList.push(item);
      this.selectedListChangedEvent.emit(this.rightList);
      this.initLeftFilteredList(this.leftFilterTerm.value);
      this.initRightFilteredList(this.rightFilterTerm.value);
    }
  }

  selectRightList(item) {
    this.rightList = this.removeArray(this.rightList, item);
    this.rightFilteredList = this.removeArray(this.rightFilteredList, item);
    this.selectedListChangedEvent.emit(this.rightList);
    this.leftList.push(item);
    this.initLeftFilteredList(this.leftFilterTerm.value);
    this.initRightFilteredList(this.rightFilterTerm.value);
  }

  private changeRightMessage(data) {
    if (data === '') {
      this.isRightFiltered = false;
      this._translate.get('app.paginglist.all', {param: this.rightList.length})
        .subscribe(message => {
          this.rightFilterMessage = message;
        });
    } else {
      this.isRightFiltered = true;
      this._translate.get('app.paginglist.filtered', {
        total: this.rightList.length,
        filtered: this.rightFilteredList.length
      }).subscribe(message => {
        this.rightFilterMessage = message;
      });
    }
  }

  private findWithAttr(array, attr, value) {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  private initLeftFilteredList(data) {
    if (isNullOrUndefined(data)) {
      data = '';
    }
    this.leftFilteredList = this.leftList
      .filter(item => item.display.toLocaleUpperCase().indexOf(data.toLocaleUpperCase()) !== -1);
    this.changeLeftMessage(data);
  }

  private initLeftFilteredListSubscribe() {
    this.leftFilterTerm.valueChanges.subscribe(data => this.initLeftFilteredList(data));
    this.leftFilteredList = this.leftList;
  }

  private initRightFilteredList(data) {
    if (isNullOrUndefined(data)) {
      data = '';
    }
    this.rightFilteredList = this.rightList
      .filter(item => item.display.toLocaleUpperCase().indexOf(data.toLocaleUpperCase()) !== -1);
    this.changeRightMessage(data);
  }

  private initRightFilteredListSubscribe() {
    this.rightFilterTerm.valueChanges.subscribe(data => this.initRightFilteredList(data));
    this.rightFilteredList = this.rightList;
  }

  private loadData() {
    if (this.serviceUrl) {
      this._http.get(this.serviceUrl).subscribe(res => {
        if (res.isSuccess && res.data && res.data.length > 0) {
          res.data.forEach(item => {
            this._translate.get(`${this.keyPrefix}${item.display}`).subscribe(display => {
              const data = {
                id: item.id,
                display: display
              };
              this.leftList.push($.extend(true, {}, data));
            });
            this.changeLeftMessage('');
            this.loadedDataEvent.emit(this.leftList);
          });
        }
      });
    } else if (this.loadObservable) {
      this.loadObservable.subscribe(res => {
        this.leftList = this.leftList.concat(res);
        this.leftFilteredList = this.leftList;
        this.changeLeftMessage('');
        this.loadedDataEvent.emit(this.leftList);
      });
    }
  }

  private removeArray(array: EnumModel[], removingItem: EnumModel) {
    const equalProp = 'id';
    const index = this.findWithAttr(array, equalProp, removingItem[equalProp]);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }


}
