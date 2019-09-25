import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { KbEnumService } from '../../../shared/services/enum/enum.service';
import { KbHashId } from '../../../shared/services/hashids/hashids.service';
import { TranslateService } from '@ngx-translate/core';
import { KbNotificationService } from '../../../shared/services/notification/notification.service';
import { KbHttpService } from '../../../shared/services/http/http.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KbLoadingBase } from '../../../components/loading/loading.base';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { isArray, isNullOrUndefined } from 'util';
import { PersonalService } from '../personal.service';
import { EnumModel } from '../../../shared/services/enum/enum.model';
import { deepCopyArray, groupBy } from '../../../shared/services/util/util';
import { KbDuallistComponent } from '../../../components/duallist/duallist.component';
import { KbFixDataService } from '../../../shared/services/fixdata/fix-data.service';
import { KbConfirmationService } from '../../../components/notification/confirmations/confirmations.service';
import { KbResolveEmit } from '../../../components/notification/confirmations/interfaces/resolve-emit';
import { KbResultBase } from '../../../shared/services/http/http-result.model';
import { FileUploadService } from '../../../shared/services/fileupload/file-upload.service';
import { KbFileCropComponent } from '../../../components/filecrop/filecrop.component';

declare const $: any;

@Component({
  templateUrl: 'personal-edit.component.html'
})
export class PersonalEditComponent extends KbLoadingBase implements OnInit, OnDestroy {

  form: FormGroup;
  observableLanguage: Observable<EnumModel[]>;
  observableInitialPage: Observable<EnumModel[]>;
  observableDeliveryDuration: Observable<EnumModel[]>;
  deliveryNoteList: any[] = [];
  observableDeliveryType: Observable<EnumModel[]>;
  purchasingSelectedList: EnumModel[];
  salesSelectedList: EnumModel[];
  categorySelectedList: EnumModel[];
  imagePath = 'assets/kb_img/kb_profil/no_avatar_transparent.png';
  @ViewChild('purchasinglist') purchasinglistComponent: KbDuallistComponent;
  @ViewChild('saleslist') saleslistComponent: KbDuallistComponent;
  @ViewChild('categoryList') categoryListComponent: KbDuallistComponent;

  flag: Map<number, string> = new Map();
  private sub: Subscription;
  private id: number;

  constructor(private _service: PersonalService,
              private _route: ActivatedRoute,
              private _http: KbHttpService,
              private _nf: KbNotificationService,
              private _translate: TranslateService,
              private _hash: KbHashId,
              private _fix: KbFixDataService,
              private _fb: FormBuilder,
              private _fu: FileUploadService,
              private _el: ElementRef,
              private _confirmation: KbConfirmationService,
              public _enum: KbEnumService) {
    super();
  }

  get transportType(): string[] {
    const formControl = this.form.get('employeeTransportationTypeList');
    if (formControl && formControl.value) {
      return formControl.value;
    }
    return [];
  }

  categorySelectedListEvent(data: any[]) {
    this.categorySelectedList = data;
  }

  getDeliveryNoteId() {
    const tmpIdDeliveryNote = this.form.get('tmpIdDeliveryNote').value;

    if (!isNullOrUndefined(tmpIdDeliveryNote) && tmpIdDeliveryNote !== 'null') {
      const note = JSON.parse(tmpIdDeliveryNote);
      if (!isNullOrUndefined(note.notes) && note.notes.length > 0) {
        return note.notes[0].idDeliveryNoteKey;
      }
    }
    return null;
  }

  getFlagUrl(order: number) {
    return 'assets/images/flags/iso/32/' + this.flag.get(order) + '.png';
  }

  getPeronalData() {
    const val = this.form.getRawValue();
    val.employeePurchasingCountryList = [];
    if (this.purchasingSelectedList) {
      for (let i = 0; i < this.purchasingSelectedList.length; i++) {
        const id = this.purchasingSelectedList[i].id;
        val.employeePurchasingCountryList.push(id);
      }
    }

    val.employeeSalesCountryList = [];
    if (this.salesSelectedList) {
      for (let i = 0; i < this.salesSelectedList.length; i++) {
        const id = this.salesSelectedList[i].id;
        val.employeeSalesCountryList.push(id);
      }
    }

    val.employeeCategoryList = [];
    if (this.categorySelectedList) {
      for (let i = 0; i < this.categorySelectedList.length; i++) {
        val.employeeCategoryList.push(this.categorySelectedList[i]['entity']);
      }
    }

    val.idDeliveryNote = this.getDeliveryNoteId();


    delete val['tmpIdDeliveryNote'];
    delete val['tmpIdDeliveryNoteLang'];
    delete val['tmpIdDeliveryNoteDescription'];


    return val;
  }

  getPhoneMaskOptions(order: number) {
    const that = this;
    return {
      onKeyValidation: function () {
        let country = $(this).inputmask('getmetadata')['cc'];
        if (country && isArray(country)) {
          country = country[0];
        }
        if (country !== that.flag.get(order)) {
          that.flag.set(order, country);
        }
      }
    };
  }

  loadDeliveryNote(): void {
    this._http.get('Company/DeliveryNote').subscribe(res => {
      if (res.isSuccess) {
        const notes = groupBy(res.data, 'idDeliveryNoteKey');
        for (const note in notes) {
          if (notes.hasOwnProperty(note)) {
            this.deliveryNoteList.push({
              key: notes[note][0].key,
              notes: notes[note]
            });
          }
        }
      }
    });

  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.observableLanguage = this._enum.language({addSelect: false});
    this.observableInitialPage = this._enum.initialPage({addSelect: true});
    this.observableDeliveryDuration = this._enum.deliveryDuration({addSelect: true});
    this.observableDeliveryType = this._enum.deliveryType();
    this.loadDeliveryNote();
    this.initializaForm();
    this.getPersonalId();
    this.onDeliveryNoteKeyChange();
    this.onDeliveryNoteLangChange();
  }


  onRemoveDeliveryNote() {
    // TODO Dile Göre ve DeliveryNoteKey ' ine göre remove edilecek
    this._http.delete('Company/DeliveryNote', this.getDeliveryNoteId()).subscribe(res => {
      if (res['isSuccess']) {
        this.loadDeliveryNote();
      } else {
        this._nf.showKobipResultMessage(res as KbResultBase);
      }
    });
  }

  onSaveOrUpdadeDeliveryNote() {

    const tmpIdDeliveryNote = this.form.get('tmpIdDeliveryNote').value;
    if (!isNullOrUndefined(tmpIdDeliveryNote) && tmpIdDeliveryNote != null) {
      const note = JSON.parse(tmpIdDeliveryNote);
      this.saveOrUpdadeDeliveryNote({
        idLanguage: this.form.get('tmpIdDeliveryNoteLang').value,
        note: this.form.get('tmpIdDeliveryNoteDescription').value,
        key: note.key
      });
      return;
    }


    const $tasks = [];
    $tasks.push(this._translate.get('personal.deliveryNote'));
    $tasks.push(this._translate.get('personal.saveDeliveryNoteKey'));
    $tasks.push(this._translate.get('app.general.save'));
    $tasks.push(this._translate.get('notification.decline'));

    Observable.forkJoin(...$tasks).subscribe((messages: string[]) => {
      this._confirmation.create(messages[0], messages[1], {
        confirmText: messages[2],
        declineText: messages[3],
        showInputText: true
      }).subscribe((ans: KbResolveEmit) => {
          if (ans.resolved === true) {
            if (isNullOrUndefined(ans.textValue)) {
              this._translate.get('personal.enterDeliveryNoteKey').subscribe(successMessage => {
                this._nf.warn(successMessage);
              });
            } else {
              this.saveOrUpdadeDeliveryNote({
                idLanguage: this.form.get('tmpIdDeliveryNoteLang').value,
                note: this.form.get('tmpIdDeliveryNoteDescription').value,
                key: ans.textValue
              });
            }
          } else {
            this._translate.get('notification.canceled').subscribe(successMessage => {
              this._nf.info(successMessage);
            });
          }
        }
      );
    });
  }

  purchasingSelectedListEvent(data: EnumModel[]) {
    this.purchasingSelectedList = data;
  }

  salesSelectedListEvent(data: EnumModel[]) {
    this.salesSelectedList = data;
  }

  toggleDeliveryNoteRemove() {
    const key = this.form.get('tmpIdDeliveryNote').value;
    return isNullOrUndefined(key) || key === 'null';
  }

  toggleDeliveryNoteSave() {
    const lang = this.form.get('tmpIdDeliveryNoteLang').value;
    const description = this.form.get('tmpIdDeliveryNoteDescription').value;
    return isNullOrUndefined(lang) || lang === 'null' ||
      isNullOrUndefined(description) || description === '';
  }

  toggleTransportType(id: string) {
    const transportType: string[] = this.transportType;
    const index = transportType.indexOf(id);
    const cloned = deepCopyArray(this.transportType);
    if (index === -1) {
      cloned.push(id);
    } else {
      cloned.splice(index, 1);
    }
    this.form.get('employeeTransportationTypeList').patchValue(cloned);
  }

  updatePersonal() {
    const value = this.getPeronalData();
    this._http.put(value, 'Employee', {loadingBase: this}).subscribe(res => {
      this._nf.showKobipResultMessage(res);
    });
  }

  uploadFinishEvent(uploadedFile) {
    this._http.put({id: uploadedFile.id}, `Employee/Image`, {loadingBase: this})
      .subscribe(value => {
        if (value.isSuccess) {
          this.imagePath = uploadedFile.path;
        } else {
          this._nf.showKobipResultMessage(value);
        }
      });
  }

  private getPersonalId() {
    this.sub = this._route.params.subscribe(params => {
      const id: string = params['id'];
      if (id) {
        this.id = +this._hash.decode(id);
        this.loadData();
      } else {
        this._translate.get('errors.personal.general.id').subscribe(mes => {
          this._nf.error(mes);
        });
      }
    });
  }

  private initializaForm() {
    this.form = this._fb.group({
      id: 0,
      companyBasedPhone: [null],
      companyBasedMail: [null],
      intName: [null],
      intLandPhone: [null],
      intLandPhoneInternal: [null],
      intMobilePhone: [null],
      intSalesMail: [null],
      intPurchasingMail: [null],
      localName: [null],
      localLandPhone: [null],
      localMobilePhone: [null],
      localPurchasingMail: [null],
      localSalesMail: [null],
      localLandPhoneInternal: [null],
      idKobipSiteLanguage: [null],
      idInitialPage: [null],
      idDeliveryDuration: [null],
      isHelpOpen: [false],
      employeeLanguageList: [null],
      isDeliveryTabOpen: [false],
      isOnlyDeliveryNoteVisible: [false],
      employeeTransportationTypeList: [null],
      employeeDeliveryTypeList: [null],
      isOnlyPartnerPostingVisible: [false],
      isAscendingPostingList: [false],
      isLastDatePosting: [false],
      idDeliveryNote: [null],
      tmpIdDeliveryNote: [null],
      tmpIdDeliveryNoteLang: [null],
      tmpIdDeliveryNoteDescription: [null],
    });

    const user: FormGroup = this._fb.group({
      name: [''],
      middleName: [''],
      surname: [''],
      id: [0],
    });

    this.form.addControl('user', user);
  }

  private loadCategory(): Observable<any> {
    return Observable.create(promise => {
      this._http.get('Company/Category').subscribe(res => {
        if (res.isSuccess && res.data && res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            const item = res.data[i];
            const data = {
              id: item.id,
              display: item.display,
              entity: item
            };
            this.categoryListComponent.leftList.push($.extend(true, {}, data));
          }
          promise.next(this.categoryListComponent.leftList);
          this.categoryListComponent.changeLeftMessage('');
          promise.complete();
        }
      });
    });
  }

  private loadData() {
    const tasks$ = [];
    tasks$.push(this.loadPurchasingCountry());
    tasks$.push(this.loadSalesCountry());
    tasks$.push(this.loadPersonal());
    tasks$.push(this.loadCategory());
    Observable.forkJoin(...tasks$).subscribe(res => {

      if (!isNullOrUndefined(res[2])) {
        const personal: any = res[2];
        if (personal.imagePath) {
          this.imagePath = personal.imagePath;
        }
        personal.employeePurchasingCountryList.forEach(countryId => {
          const filtered = this.purchasinglistComponent.leftList.filter((item => item.id === countryId));
          if (filtered && filtered.length === 1) {
            this.purchasinglistComponent.selectLeftList(filtered);
          }
        });

        personal.employeeSalesCountryList.forEach(countryId => {
          const filtered = this.saleslistComponent.leftList.filter((item => item.id === countryId));
          if (filtered && filtered.length === 1) {
            this.saleslistComponent.selectLeftList(filtered);
          }
        });

        personal.employeeCategoryList.forEach(category => {
          const filtered = this.categoryListComponent.leftList.filter((item => item.id === category.id));
          if (filtered && filtered.length === 1) {
            this.categoryListComponent.selectLeftList(filtered);
          }
        });
      }
    });
  }

  private loadPersonal(): Observable<any> {
    return Observable.create(promise => {
      const personal = this._service.getLocalPersonal();
      if (personal.id === this.id) {
        this.form.patchValue(personal);
        promise.next(personal);
        promise.complete();
      } else {
        this._service.getCompany({loadingBase: this}).subscribe(res => {
          if (res.isSuccess && res.data) {
            this.form.patchValue(res.data);
            promise.next(res.data);
          } else {
            this._nf.showKobipResultMessage(res);
          }
          promise.complete();
        });
      }
    });
  }

  private loadPurchasingCountry(): Observable<any> {
    return Observable.create(promise => {
      this._http.get('Company/PurchasingCountry').subscribe(res => {
        if (res.isSuccess && res.data && res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            const item = res.data[i];
            this._translate.get(`${item.id}`).subscribe(display => {
              const data = {
                id: item.id,
                display: display
              };
              this.purchasinglistComponent.leftList.push($.extend(true, {}, data));
            });
          }
          promise.next(this.purchasinglistComponent.leftList);
          this.purchasinglistComponent.changeLeftMessage('');
          promise.complete();
        }
      });
    });
  }

  private loadSalesCountry(): Observable<any> {
    return Observable.create(promise => {
      this._http.get('Company/SalesCountry').subscribe(res => {
        if (res.isSuccess && res.data && res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            const item = res.data[i];
            this._translate.get(`${item.id}`).subscribe(display => {
              const data = {
                id: item.id,
                display: display
              };
              this.saleslistComponent.leftList.push($.extend(true, {}, data));
            });
          }
          promise.next(this.saleslistComponent.leftList);
          this.saleslistComponent.changeLeftMessage('');
          promise.complete();
        }
      });
    });
  }

  private onDeliveryNoteChange(notes: any, lang: string) {
    if (isNullOrUndefined(lang) || isNullOrUndefined(notes) || isNullOrUndefined(notes.notes)) {
      this.form.patchValue({tmpIdDeliveryNoteDescription: ''}, {emitEvent: true});
      return;
    }

    const filtered = notes.notes.filter(note => note.idLanguage === lang);
    if (filtered.length > 0) {
      this.form.patchValue({tmpIdDeliveryNoteDescription: filtered[0].note}, {emitEvent: true});
    } else {
      this.form.patchValue({tmpIdDeliveryNoteDescription: ''}, {emitEvent: true});
    }
  }

  private onDeliveryNoteKeyChange() {
    this.form.get('tmpIdDeliveryNote').valueChanges.subscribe(value => {
      const obj = JSON.parse(value);
      const lang = this.form.get('tmpIdDeliveryNoteLang').value;
      this.onDeliveryNoteChange(obj, lang);
    });
  }

  private onDeliveryNoteLangChange() {
    this.form.get('tmpIdDeliveryNoteLang').valueChanges.subscribe(value => {
      const notes = this.form.get('tmpIdDeliveryNote').value;
      const obj = JSON.parse(notes);
      this.onDeliveryNoteChange(obj, value);
    });
  }

  private saveOrUpdadeDeliveryNote(deliveryNote: any) {
    this._http.put(deliveryNote, 'Company/DeliveryNote').subscribe(res => {
      if (res.isSuccess) {
        this.loadDeliveryNote();
      } else {
        this._nf.showKobipResultMessage(res);
      }
    });
  }

}
