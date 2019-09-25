import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { KbLoadingBase } from '../../../components/loading/loading.base';
import { Observable } from 'rxjs/Observable';
import { PostingRetrieveModel } from './model/posting-retrive.model';
import { KbHttpService } from '../../../shared/services/http/http.service';
import { KbNotificationService } from '../../../shared/services/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { forEachSync } from '../../../shared/utils/array.extension';
import { FormBuilder } from '@angular/forms';
import { KbSelect2Item } from '../../../components/select2/kb-select2/kb-select2-item';
import { map, tap } from 'rxjs/operators';
import { HotAdsService } from 'app/views/+sale/+hot-ads/hot-ads.service';
import { EnumModel } from '../../../shared/services/enum/enum.model';

declare const $: any;

@Component({
  templateUrl: 'hot-ads.component.html',
  providers: [HotAdsService]
})
export class HotAdsComponent extends KbLoadingBase implements OnInit, AfterViewInit {
  observablePosting: Observable<PostingRetrieveModel[]>;
  lastUpdated;
  filterForm;
  limit = 20;
  currentPage = 1;
  count = 0;
  filterCount = 0;

  public listItems: (term: string) => Observable<any[]>;
  public listItemsMax: (term: string, ids: string[]) => Observable<any[]>;
  public entityToIqSelect2Item: (entity: any) => KbSelect2Item;
  public getItemsCategory: (ids: string[]) => Observable<any[]>;

  public listItemsCountry: (term: string) => Observable<any[]>;
  public listItemsMaxCountry: (term: string, ids: string[]) => Observable<EnumModel[]>;
  public entityToIqSelect2ItemCountry: (entity: EnumModel) => KbSelect2Item;
  public getItemsCountry: (ids: string[]) => Observable<EnumModel[]>;


  constructor(private _http: KbHttpService,
              private dataService: HotAdsService,
              private _nf: KbNotificationService,
              private _translate: TranslateService,
              private _fb: FormBuilder) {
    super();
    this.lastUpdated = new Date();
  }

  calculateLimit(width: number) {
    if (width < 1330) {
      this.limit = 20;
    } else if (width >= 1330 && width < 1730) {
      this.limit = 21;
    } else if (width >= 1730 && width < 2470) {
      this.limit = 24;
    } else if (width >= 2470 && width < 2840) {
      this.limit = 30;
    } else if (width >= 2840 && width < 3210) {
      this.limit = 36;
    } else if (width >= 3210) {
      this.limit = 42;
    }
  }

  getLanguages(posting: PostingRetrieveModel): Observable<string> {
    const $tasks = [];
    forEachSync(posting.languageList, (item => {
      $tasks.push(this._translate.get('zz.language.' + item));
    }));
    return Observable.forkJoin($tasks).map(item => item.join('/'));
  }

  getPage(page: number) {
    this.currentPage = page;
    this.filterForm.patchValue({offset: ((page - 1) * this.limit)}, {emitEvent: false});
    this.loadPosting();
  }

  loadPosting() {
    this.showLoading(false);
    this.filterForm.patchValue({limit: this.limit}, {emitEvent: false});
    this.observablePosting = this._http.post(this.filterForm.getRawValue(), 'PostingInfo/Search').map(res => {
      this.hideLoading();
      if (res.isSuccess) {
        this.count = res.data['count'];
        this.filterCount = res.data['filterCount'];
        return res.data['data'];
      } else {
        this._nf.showKobipResultMessage(res);
        this.count = 0;
        this.filterCount = 0;
        return [];
      }
    });
  }

  ngAfterViewInit(): void {
    this.searchFieldOnOff();
    setTimeout(() => {
      this.filterForm.patchValue({
        'categoryList': [
          6,
          8,
          7
        ],
        'countryList': [
          'zzc.AG',
          'zzc.AF',
          'zzc.AD'
        ]
      });
    }, 0);
  }

  ngOnInit(): void {
    this.calculateLimit(window.screen.width);
    this.initializeFilterForm();
    this.loadPosting();
    this.initializeCategorySelect();
    this.initializeCountrySelect();
    this.initializeFilterFormChanges();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateLimit(event.target.innerWidth);
  }

  removeFilter() {
    this.filterForm.patchValue(this.getFilterDefaultValues(), {
      emitEvent: false
    });
    this.loadPosting();
  }

  private filterFormEventsInitialize() {
    this.filterForm.get('isAmountOrder').valueChanges.subscribe(this.loadPosting.bind(this));
    this.filterForm.get('isDeadlineOrder').valueChanges.subscribe(this.loadPosting.bind(this));
    this.filterForm.get('onlyShowPartnerPosting').valueChanges.subscribe(this.loadPosting.bind(this));
  }

  private getFilterDefaultValues() {
    return {
      categoryList: null,
      countryList: null,
      pinCountryList: true,
      pinCategoryList: true,
      minPiece: 0,
      pattern: '',
      isAmountOrder: false,
      isDeadlineOrder: false,
      onlyShowPartnerPosting: false,
      showBlockedPosting: false,
      limit: this.limit,
      offset: 0
    };
  }

  private initializeCategorySelect() {
    this.listItems = (term: string) => this.dataService.categoryListData(term);
    this.listItemsMax = (term: string, ids: string[]) => {
      const selectedCount = ids ? ids.length : 0;
      return this.dataService
        .categoryListDataMax(term, 20 + selectedCount)
        .pipe(
          tap(response => this.count = response['count']),
          map((response) => response['results'])
        );
    };
    // this.getItemsCategory = (ids: string[]) => this.dataService.categoryGetItems(ids);
    this.entityToIqSelect2Item = (entity: any) => {
      return {
        id: entity.id,
        text: entity.display,
        entity: entity
      };
    };
  }

  private initializeCountrySelect() {
    this.listItemsCountry = (term: string) => this.dataService.countryListData(term);
    this.listItemsMaxCountry = (term: string, ids: string[]) => {
      const selectedCount = ids ? ids.length : 0;
      return this.dataService
        .countryListDataMax(term, 20 + selectedCount)
        .pipe(
          tap(response => this.count = response['count']),
          map((response) => response['results'])
        );
    };
    this.getItemsCountry = (ids: string[]) => this.dataService.countryGetItems(ids);
    this.entityToIqSelect2ItemCountry = (entity: any) => {
      return {
        id: entity.id,
        text: entity.display,
        entity: entity
      };
    };
  }

  private initializeFilterForm() {
    this.filterForm = this._fb.group({
      categoryList: [null],
      countryList: [null],
      pinCountryList: [true],
      pinCategoryList: [true],
      minPiece: [0],
      pattern: [''],
      isAmountOrder: [false],
      isDeadlineOrder: [false],
      onlyShowPartnerPosting: [false],
      showBlockedPosting: [false],
      limit: [this.limit],
      offset: [0]
    });
    this.filterFormEventsInitialize();
  }

  private initializeFilterFormChanges() {
    this.filterForm.get('pinCountryList').valueChanges.subscribe(value => {
      if (value === true) {
        this._http.get('Company/Country').subscribe(res => {
          if (res.isSuccess) {
            const ids = [];
            res.data.forEach(item => ids.push(item.id));
            this.filterForm.patch({countryList: ids});
          }
        });
      }
    });
  }

  private searchFieldOnOff() {
    $(document).ready(function () {
      $('#sif-ackapa').click(function () {
        $(this).toggleClass('fa-caret-down');
        $(this).toggleClass('fa-caret-up');
        $('.sif-sag-menu').toggle();
      });
      $(document).mousedown(function (e) {
        if (!(e.target.id === 'sif-menu-panel'
            || $(e.target).closest('#sif-menu-panel').length)
          && $('.sif-sag-menu:visible').length
          && e.target.id !== 'sif-ackapa'
          && e.target.className.indexOf('select2-container') > 0
          && e.target.id !== 'sif-ackapa') {
          $('#sif-ackapa').trigger('click');
        }
      });
    });
  }

}


