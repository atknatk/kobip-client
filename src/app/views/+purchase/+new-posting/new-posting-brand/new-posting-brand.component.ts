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
  selector: 'kb-new-posting-brand',
  templateUrl: './new-posting-brand.component.html'
})
export class NewPostingBrandComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() isEdit: boolean;
  edittingBrand: PostingBrandModel = new PostingBrandModel();
  private brandListName = 'postingBrandList';

  constructor(private _fb: KbFormBuilder) {

  }

  get postingBrandList(): PostingBrandModel[] {
    return this.form.get(this.brandListName).value;
  }

  addBrand() {
    const brandList = this.form.get(this.brandListName) as FormArray;
    brandList.push(this._fb.createForm(this.edittingBrand));
    this.edittingBrand = new PostingBrandModel();
  }

  getDisplay(brand: PostingBrandModel): string {
    const brandArr = [];
    if (!isNullOrUndefined(brand.brand) && brand.brand !== '') {
      brandArr.push(brand.brand);
    }
    if (!isNullOrUndefined(brand.model) && brand.model !== '') {
      brandArr.push(brand.model);
    }
    if (!isNullOrUndefined(brand.orderCode) && brand.orderCode !== '') {
      brandArr.push(brand.orderCode);
    }
    return brandArr.join(' * ');
  }

  isValid(): boolean {
    return !isNullOrUndefined(this.edittingBrand.brand) && this.edittingBrand.brand !== ''
      && !isNullOrUndefined(this.edittingBrand.model) && this.edittingBrand.model !== '';
  }

  ngOnInit(): void {
  }

  removeBrand(index: number) {
    const brandList = this.form.get(this.brandListName) as FormArray;
    brandList.removeAt(index);
  }

}


