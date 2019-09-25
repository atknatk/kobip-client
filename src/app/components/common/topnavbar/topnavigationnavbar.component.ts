import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { KbHttpService } from '../../../shared/services/http/http.service';
import { KbTokenService } from '../../../shared/services/auth/token.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


declare var jQuery: any;

@Component({
  selector: 'kb-topnavigationnavbar',
  templateUrl: 'topnavigationnavbar.template.html'
})
export class TopNavigationNavbarComponent {

  constructor(private _http: HttpClient,
              private _tokenService: KbTokenService,
              private _router: Router) {
  }

  toggleNavigation(): void {
    jQuery('body').toggleClass('mini-navbar');
    smoothlyMenu();
  }

  logout() {
    this._http.delete('api/Authorization?token=' + this._tokenService.getToken()).subscribe(res => {
        if (res['isSuccess'] === true) {
          this._tokenService.clearToken();
        }
        this._router.navigate(['auth/login']);
      }
    );
  }

}
