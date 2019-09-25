import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { KbHttpService } from '../../../shared/services/http/http.service';
import { KbNotificationService } from '../../../shared/services/notification/notification.service';
import { KbLoadingBase } from '../../../components/loading/loading.base';
import { EqualValidatorDirective } from '../../../components/validation/equal-validator.directive';


@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent extends KbLoadingBase implements OnInit {

  form: FormGroup;

  constructor(private _fb: FormBuilder,
              private _service: KbHttpService,
              private _notification: KbNotificationService) {
    super();
  }


  ngOnInit(): void {
    this.form = this._fb.group({
      rootMail: ['', [Validators.maxLength(200)]],
      taxNo: ['', [Validators.maxLength(50)]],
      localShortName: ['', [Validators.maxLength(40), Validators.minLength(3)]],
      rootPassword: ['', [Validators.maxLength(200), Validators.minLength(8)]],
      confirmRootPassword: [''],
      // policy: [false, Validators.required],
    });
  }


  onSubmit() {
    const body = this.form.value;
    delete body['confirmRootPassword'];
    this._service.post(body, 'Company/CompanyRegister', {
      useToken: false,
      loadingBase: this
    }).subscribe(res => {
      this._notification.showKobipResultMessage(res);
    });
  }


}
