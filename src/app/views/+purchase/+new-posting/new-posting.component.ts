import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PostingInfoModel } from './new-posting.model';
import { FormGroup } from '@angular/forms';
import { KbFormBuilder } from '../../../shared/services/form-builder/form-builder.service';
import { NewPostingLanguageComponent } from './new-posting-language/new-posting-language.component';

declare const $: any;

@Component({
  templateUrl: 'new-posting.component.html',
})
export class NewPostingComponent implements OnInit, AfterViewInit, OnDestroy {
  postingForm: FormGroup;

  @ViewChild('language') languageComponent: NewPostingLanguageComponent;
  private tmpFields = ['tmpSelectedLanguage'];

  constructor(private _fb: KbFormBuilder) {
    // this.postingInfoModel
  }

  get isEdit(): boolean {
    return true;
  }

  get selectedDetailIndex() {
    return this.languageComponent.getSelectedIndex();
  }

  // get transportType(): string {
  //   const formControl = this.form.get('employeeTransportationTypeList');
  //   if (formControl && formControl.value) {
  //     return formControl.value;
  //   }
  //   return [];
  // }

  ngAfterViewInit(): void {
    if (this.languageComponent && this.isEdit) {
      const detailFormGroup = this.languageComponent.getSelectedDetailForm();
    }
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.initForm();
  }


  refreshImages(status) {
    if (status === true) {
      console.log('Uploaded successfully!');
      //  this.getImageData();
    }
  }

  private initForm() {
    this.postingForm = this._fb.createForm(new PostingInfoModel());
    this.postingForm.addControl('postingDetailList', this._fb.formBuilder.array([]));
    this.postingForm.addControl('postingInfoCountryList', this._fb.formBuilder.array([]));
    this.postingForm.addControl('postingInfoDeliveryTypeList', this._fb.formBuilder.array([]));
    this.postingForm.addControl('postingInfoTransportationTypeList', this._fb.formBuilder.control(null));
    this.postingForm.addControl('postingInfoImageList', this._fb.formBuilder.control(null));
    this.postingForm.addControl('postingInfoFileList', this._fb.formBuilder.control(null));
    this.postingForm.addControl('postingBrandList', this._fb.formBuilder.array([]));

    for (const field of this.tmpFields) {
      this.postingForm.addControl(field, this._fb.formBuilder.control(null));
    }
  }

}


