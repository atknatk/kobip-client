import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { KbNotificationService } from '../notification/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class GeolocationService {

  private key = 'AIzaSyAoIzXDgYYnR9gtOEhAs-G3o884IwZcWrc';
  private url = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private _http: HttpClient,
              private _nf: KbNotificationService,
              private _translate: TranslateService) {
  }

  public getLocation(isInternational: boolean = false): Observable<any> {
    return Observable.create(observer => {

      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.getLocationAddressFromGoogle(position.coords.latitude, position.coords.longitude, isInternational)
              .subscribe(res => {
                observer.next(res);
                observer.complete();
              });
          },
          (error) => {
            switch (error.code) {
              case 1:
                if (isInternational === false) {
                  this._translate.get('errors.location.permissionDenied').subscribe(mes => {
                    this._nf.error(mes);
                  });
                }
                break;
              case 2:
                if (isInternational === false) {
                  this._translate.get('errors.location.positionUnavailable').subscribe(mes => {
                    this._nf.error(mes);
                  });
                }
                break;
              case 3:
                if (isInternational === false) {
                  this._translate.get('errors.location.timeout').subscribe(mes => {
                    this._nf.error(mes);
                  });
                }
                // observer.error(GEOLOCATION_ERRORS['']);
                break;
            }
          });
      } else {
        if (isInternational === false) {
          this._translate.get('errors.location.unsupportedBrowser').subscribe(mes => {
            this._nf.error(mes);
          });
        }
      }
    });
  }

  private getLocationAddressFromGoogle(lat: number, lng: number, isInternational: boolean = false): Observable<any> {
    let lang = '';
    if (isInternational === true) {
      lang = 'en';
    } else {
      lang = this._translate.getDefaultLang();
    }

    const url = `${this.url}?latlng=${lat},${lng}&key=${this.key}&language=${lang}`;
    return this._http.get(url).map((res: any) => {
        const result = [];
        // Başarılı adresler geldi.
        if (res.status === 'OK') {
          for (let i = 0; i < res.results.length; i++) {
            const address = res.results[i];
            // adreslerin administrative_area_level_1 olanı seçiliyor
            const typeIndex = address.types.indexOf('administrative_area_level_1');
            if (typeIndex > -1) {
              // adres componentleri geziliyor
              for (let z = 0; z < address['address_components'].length; z++) {
                const addressComponent = address['address_components'][z];
                const compTypeIndex = addressComponent.types.indexOf('administrative_area_level_1');
                if (compTypeIndex > -1) {
                  result.push(addressComponent['long_name']);
                  result.push(address['formatted_address']);
                  break;
                }
              }
            }
          }
        }
        return result;
      }
    );
  }
}
