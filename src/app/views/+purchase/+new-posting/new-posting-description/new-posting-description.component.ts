import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { KbEnumService } from '../../../../shared/services/enum/enum.service';
import { Observable } from 'rxjs/Observable';
import { EnumModel } from '../../../../shared/services/enum/enum.model';
import { PostingBrandModel, PostingDetailModel } from '../new-posting.model';
import { KbFormBuilder } from '../../../../shared/services/form-builder/form-builder.service';
import { KbNotificationService } from '../../../../shared/services/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined } from 'util';
import { deepCopy } from '../../../../shared/services/util/util';

declare const $: any;

@Component({
  selector: 'kb-new-posting-description',
  templateUrl: './new-posting-description.component.html'
})
export class NewPostingDescriptionComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() isEdit: boolean;
  showingEdit = false;
  private detailListName = 'postingDetailList';
  private isAnyIntialize = false;

  constructor(private _translate: TranslateService) {

  }

  set postingDescription(value: string) {
    // .postingDescription
    const details = this.form.get(this.detailListName).value;
    const filtered = details.filter(detail => detail.idLanguage === this.currLang);
    if (filtered === 1) {
      filtered[0].postingDescription = value;
    }
  }

  get currLang() {
    return this.form.get('tmpSelectedLanguage').value;
  }

  get currentDetailForm(): FormGroup {
    const details = this.form.get(this.detailListName) as FormArray;
    for (let i = 0; i < details.controls.length; i++) {
      if (details.controls[i].get('idLanguage').value === this.currLang) {
        return details.controls[i] as FormGroup;
      }
    }
    return null;
  }

  getPostingDescription(): string {
    // .postingDescription
    const details = this.form.get(this.detailListName).value;
    const filtered = details.filter(detail => detail.idLanguage === this.currLang);
    if (filtered.length === 1) {
      if (isNullOrUndefined(filtered[0].postingDescription) || filtered[0].postingDescription === '') {
        return '';
      } else {
        return filtered[0].postingDescription;
      }
    }
  }

  ngOnInit(): void {
    this.initFocus();
    this.form.get('tmpSelectedLanguage').valueChanges.subscribe(_ => {
      this.getPostingDescription();
    });
  }

  onFocusDescription() {

    $('#postingDescription').summernote({
      dialogsFade: true,
      callbacks: {
        onChange: (contents) => {
          const _currDetailForm = this.currentDetailForm;
          if (_currDetailForm != null) {
            _currDetailForm.patchValue({postingDescription: contents});
          }
        },
        onInit: () => {
          this.showingEdit = true;
        }
      }
    });
    this.showingEdit = true;
    this.isAnyIntialize = true;
  }


  private initFocus() {
    $(document).mousedown((e) => {
      if (!$(e.target).closest('.note-editor').length
        && e.target.id !== 'posting-desc'
        && this.isAnyIntialize
        && this.showingEdit
      ) {
        $('#postingDescription').summernote('destroy');
        this.showingEdit = false;
      }
    });
  }


}


