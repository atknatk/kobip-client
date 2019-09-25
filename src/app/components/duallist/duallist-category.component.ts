import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { KbHttpService } from '../../shared/services/http/http.service';
import { TranslateService } from '@ngx-translate/core';
import { EnumModel } from '../../shared/services/enum/enum.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { KbNotificationService } from '../../shared/services/notification/notification.service';
import { sortBy } from '../../shared/services/util/util';
import { forEach } from '@angular/router/src/utils/collection';

declare var $: any;


@Component({
  selector: 'kb-duallist-category',
  template: `
    <div class="bootstrap-duallistbox-container row moveonselect">
      <div class="box1 col-md-12"
           infiniteScroll
           infiniteScrollContainer='.infinite-scroll-container'
           [infiniteScrollDisabled]="isRunning"
           [infiniteScrollDistance]="10"
           (scrolled)="searchMore()"
           [immediateCheck]="true">
        <div *ngIf="showFilter">
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
                 style="margin-top: 10px; padding-bottom: 6px"
                 placeholder="{{'app.general.filter' | translate}}"
                 type="text">
          <div style="height: 6px;">
            <div *ngIf="isRunning" class="load-bar">
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
            </div>
          </div>
        </div>
        <select multiple="multiple"
                (change)="selectLeftListWithService($event.target.selectedOptions)"
                class="form-control infinite-scroll-container"
                style="overflow-y: auto;"
                [ngStyle]="getHeightCss()">
          <optgroup disabled hidden></optgroup>
          <option *ngFor="let item of leftFilteredList" value="{{ item | json}}">
            {{item.display}}
          </option>
        </select>
      </div>
      <div class="box2 col-md-12 m-t">
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
        <div style="height: 6px;"></div>
        <div class="row kb-firma_kategori">
          <div class="col-xs-12" *ngFor="let item of rightFilteredList">
            <div [innerHTML]="getSelectedDisplayHtml(item.display)">
            </div>
            <div (click)="selectRightListWithService(item)" style="cursor: pointer">
              <i class="fa fa-trash"></i></div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class KbDuallistServerSideComponent implements OnInit {


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
  @Input() selectHeight = 162;
  @Input() showFilter = true;
  @Output('selectedListChangedEvent') selectedListChangedEvent: EventEmitter<EnumModel[]> = new EventEmitter<EnumModel[]>();
  @Output('loadedDataEvent') loadedDataEvent: EventEmitter<EnumModel[]> = new EventEmitter<EnumModel[]>();
  @Input() serviceUrl: string;
  httpObservable: Subscription;
  isRunning = false;
  private pattern = '';
  private limit = 100;
  private offset = 0;

  constructor(private _http: KbHttpService,
              private _translate: TranslateService,
              private _nf: KbNotificationService) {

  }

  @Input()
  set selectedList(items: any[]) {
    if (isNullOrUndefined(items)) {
      return;
    }
    items.forEach(item => this.selectRightList(item));
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

  getHeightCss() {
    return {height: `${this.selectHeight}px`};
  }

  getSelectedDisplayHtml(item: string): string {
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

  leftShowAll() {
    this.leftFilterTerm.patchValue('');
  }

  ngOnInit(): void {
    this.loadList(this.pattern, this.limit, this.offset);
    this.initLeftFilteredListSubscribe();
    this.initRightFilteredListSubscribe();
    this.changeLeftMessage('');
    this.changeRightMessage('');
  }

  rightShowAll() {
    this.rightFilterTerm.patchValue('');
  }

  searchMore() {
    this.isRunning = true;
    this.loadList(this.leftFilterTerm.value, 20, this.leftList.length);
  }

  selectLeftList([item]) {
    // this.leftList = this.removeArray(this.leftList, item);
    // this.leftFilteredList = this.removeArray(this.leftList, item);
    if (this.rightList.map(r => r.id).indexOf(item.id) === -1) {
      this.rightList.push(item);
      this.selectedListChangedEvent.emit(this.rightList);
    }
    // this.initLeftFilteredList(this.leftFilterTerm.value);
    this.initRightFilteredList(this.rightFilterTerm.value);
    sortBy(this.rightList, {
      prop: 'display',
      desc: false,
      parser: (t) => isNullOrUndefined(t) ? '' : t.toLocaleUpperCase()
    });
  }

  selectLeftListWithService(items) {
    let isReturned = false;
    if (items.length > 30) {
      this._translate.get('app.reachedMaximum').subscribe(res => {
        this._nf.warn(res);
      });
      return;
    }

    for (let i = 0; i < items.length; i++) {
      if (isReturned) {
        return;
      }

      if (this.rightList.length >= 30) {
        this._translate.get('app.reachedMaximum').subscribe(res => {
          this._nf.warn(res);
        });
        isReturned = true;
        return;
      }

      const item = JSON.parse(items[i].value);
      if (item && item.pathInfo
        && this.rightList.filter(selected => selected.pathInfo === item.pathInfo).length === 0) {
        this._http.post(item.pathInfo, 'Company/Category').subscribe(res => {
          if (res.isSuccess) {
            item.relCompanyCategoryId = res.objectId;
            this.selectLeftList([item]);
          }
        });
      }
    }
  }

  selectRightList(item) {
    this.rightList = this.removeArray(this.rightList, item);
    this.rightFilteredList = this.removeArray(this.rightFilteredList, item);
    this.selectedListChangedEvent.emit(this.rightList);
    // this.leftList.push(item);
    // this.initLeftFilteredList(this.leftFilterTerm.value);
    this.initRightFilteredList(this.rightFilterTerm.value);
  }

  selectRightListWithService(item) {
    this._http.delete('Company/Category', item.relCompanyCategoryId).subscribe((res: any) => {
      if (res.isSuccess) {
        this.selectRightList(item);
      }
    });
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
    this.leftList = [];
    this.leftFilteredList = [];
    this.isRunning = true;
    this.loadList(data, this.limit, this.offset);
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

  private loadList(pattern: string, limit: number, offset: number) {
    if (this.serviceUrl) {
      let url = `${this.serviceUrl}?limit=${limit}&offset=${offset}&pattern=`;
      url += isNullOrUndefined(pattern) ? `` : `${pattern}`;
      if (this.httpObservable) {
        this.httpObservable.unsubscribe();
      }
      this.httpObservable = this._http.get(url).delay(300).subscribe(res => {
        if (res.isSuccess && res.data && res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            const item = res.data[i];
            this.changeLeftMessage('');
            this.loadedDataEvent.emit(this.leftList);
            this.leftList = this.leftList.concat(item);
            this.leftFilteredList = this.leftList;
            this.loadedDataEvent.emit(this.leftList);
            // TODO mesaj olmuş olabilir.
            this.changeLeftMessage('');
          }
          this.loadSelectedCategories('Company/Category?pattern=&limit=300&offset=0');
        }
        this.isRunning = false;
      });
    }
  }

  private loadSelectedCategories(url: string) {
    this._http.get(url).subscribe(res => {
      if (res.isSuccess && res.data) {
        res.data.forEach(item => this.selectLeftList([item]));
      }
    });
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
