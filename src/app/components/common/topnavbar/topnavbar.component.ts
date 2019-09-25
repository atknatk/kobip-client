import { Component, OnInit } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { KbTokenService } from '../../../shared/services/auth/token.service';
import { HttpClient } from '@angular/common/http';
import { KbHttpService } from '../../../shared/services/http/http.service';
import { KbEnumService } from '../../../shared/services/enum/enum.service';
import { LocalizeRouterService } from '../../../shared/utils/localize-router/localize-router.service';
import { KbStorageService } from '../../../shared/services/storage/storage.service';
import { KbAuthUser } from '../../../model/auth-user';
import { kobipConfig } from '../../../shared/kobip.config';

declare var jQuery: any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent implements OnInit {
  curruntLang: string;
  user: KbAuthUser;
  kobipConfig = kobipConfig;

  constructor(private _http: HttpClient,
              private _kbHttp: KbHttpService,
              private _tokenService: KbTokenService,
              private _storage: KbStorageService,
              private i18n: TranslateService,
              private _router: Router,
              private activatedRoute: ActivatedRoute,
              private _localize: LocalizeRouterService,
              private enumService: KbEnumService) {
    this.curruntLang = i18n.getDefaultLang();
  }

  languageChange(lang) {
    this.i18n.resetLang(this.curruntLang);
    this.curruntLang = lang;
    this.i18n.use(lang);
    this.i18n.setDefaultLang(lang);
  }

  logout() {
    this._tokenService.clearToken();
    this._kbHttp.reset();
    this._router.navigate([`${this._localize.parser.currentLang}/auth/login`]);
  }

  ngOnInit(): void {
    this.user = this._storage.getItem(kobipConfig.authUserKey);
  }

  routePersonalEdit() {
    this._router.navigate(['personal/edit']);
  }

  routePersonalInfo() {
    this._router.navigate(['personal/info']);
  }

  toggleNavigation(): void {
    jQuery('body').toggleClass('mini-navbar');
    smoothlyMenu();
  }

  private geti18nData(): string[] {
    const result: string[] = [];
    const routeConfig = this.activatedRoute.routeConfig;
    const urlPaths = this._router.url.split('/');
    for (let i = 0; i < urlPaths.length; i++) {
      const urlPath = urlPaths[i];
      if (urlPaths && routeConfig) {
        if (routeConfig.path === urlPath && routeConfig.data && routeConfig.data['i18n']) {
          result.push(routeConfig.data['i18n']);
        } else if (routeConfig.children && routeConfig.children.length > 0) {
          for (let z = 0; z < routeConfig.children.length; z++) {
            const child = routeConfig.children[z];
            if (child.path === urlPath && child.data && child.data['i18n']) {
              result.push(child.data['i18n']);
            }
          }
        }
      }
    }

    return result;
  }
}
