import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { KbEnumService } from '../../../../shared/services/enum/enum.service';
import { Observable } from 'rxjs/Observable';
import { EnumModel } from '../../../../shared/services/enum/enum.model';
import { PostingDetailModel } from '../new-posting.model';
import { KbFormBuilder } from '../../../../shared/services/form-builder/form-builder.service';
import { KbNotificationService } from '../../../../shared/services/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { KbLoggerService } from '../../../../shared/services/log/logger.service';

declare const $: any;

@Component({
  selector: 'kb-new-posting-language',
  templateUrl: './new-posting-language.component.html'
})
export class NewPostingLanguageComponent implements OnInit {
  @Input() form: FormGroup;
  languageObservable: Observable<EnumModel[]>;
  private detailListName = 'postingDetailList';

  constructor(private _enum: KbEnumService,
              private _fb: KbFormBuilder,
              private _translate: TranslateService,
              private _log: KbLoggerService,
              private _nf: KbNotificationService) {
  }

  get postingDetailList(): PostingDetailModel[] {
    return this.form.get(this.detailListName).value;
  }

  get selectedLanguage(): string {
    return this.form.get('tmpSelectedLanguage').value;
  }

  set selectedLanguage(idLanguage: string) {
    this.form.get('tmpSelectedLanguage').patchValue(idLanguage, {emitEvent: true});
  }


  addOrSelectLanguage(idLanguage: string) {
    const filtered = this.postingDetailList.filter(item => item.idLanguage === idLanguage);
    if (filtered.length === 0) {
      const details = this.form.get(this.detailListName) as FormArray;
      const detailForm = this._fb.createForm(new PostingDetailModel());
      detailForm.patchValue({idLanguage: idLanguage});
      details.push(detailForm);
    }
    this.selectLanguage(idLanguage);
  }

  getSelectedDetailForm(): FormGroup {
    const details = this.form.get(this.detailListName) as FormArray;
    for (let i = 0; i < details.controls.length; i++) {
      const group: FormGroup = details.controls[i] as FormGroup;
      if (group.value.idLanguage === this.selectedLanguage) {
        return group;
      }
    }
  }

  getSelectedIndex(): number {
    const details = this.form.get(this.detailListName) as FormArray;
    for (let i = 0; i < details.controls.length; i++) {
      const group: FormGroup = details.controls[i] as FormGroup;
      if (group.value.idLanguage === this.selectedLanguage) {
        return i;
      }
    }
  }

  ngOnInit(): void {
    this._log.debug('NewPostingLanguageComponent is initialized');
    this.languageObservable = this._enum.language();
    this.addOrSelectLanguage(`zz.language.${this._translate.currentLang}`);
  }

  removeLanguage(index: number) {
    const details = this.form.get(this.detailListName) as FormArray;
    if (details.length === 1) {
      this._translate.get('posting.atLeastOneLanguage').subscribe(message => {
        this._nf.info(message);
      });
    } else {
      this._nf.removeConfirm(() => details.removeAt(index),
        this.selectLanguage.bind(this), this.postingDetailList[index === 0 ? 1 : 0].idLanguage);
    }
  }

  selectLanguage(idLanguage) {
    this.selectedLanguage = idLanguage;
  }


}


