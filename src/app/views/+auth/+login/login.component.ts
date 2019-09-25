import { Component, OnInit } from '@angular/core';
import { KbNotificationService } from '../../../shared/services/notification/notification.service';
import { KbHttpService } from '../../../shared/services/http/http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KbLoadingBase } from '../../../components/loading/loading.base';
import { Router } from '@angular/router';
import { KbStorageService } from '../../../shared/services/storage/storage.service';
import { kobipConfig } from '../../../shared/kobip.config';
import { KbTokenService } from '../../../shared/services/auth/token.service';
import { LocalizeRouterService } from '../../../shared/utils/localize-router/localize-router.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent extends KbLoadingBase implements OnInit {

  form: FormGroup;

  constructor(private _fb: FormBuilder,
              private _service: KbHttpService,
              private _storage: KbStorageService,
              private _token: KbTokenService,
              private _route: Router,
              private _localize: LocalizeRouterService,
              private _notification: KbNotificationService) {
    super();
  }


  ngOnInit(): void {
    this.form = this._fb.group({
      mail: ['aliaktas@gmail.com'],
      password: ['123456'],
    });
  }

  onSubmit() {
    const body = this.form.value;
    this.showLoading();
    this._service.post(body, 'Authorization', {
      useToken: false
    }).subscribe(res => {
      this.hideLoading();
      if (res.isSuccess) {
        this._service.reset();
        this._token.clearToken();
        this._storage.setItem(kobipConfig.authUserKey, res.data);
        this._route.navigate([this._localize.parser.currentLang + '/company/general']);
      } else {
        this._notification.showKobipResultMessage(res);
      }
    });
  }
}
