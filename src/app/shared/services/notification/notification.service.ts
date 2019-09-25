import { Injectable } from '@angular/core';
import { KbResultBase } from '../http/http-result.model';
import { Observable } from 'rxjs/Observable';
import { KbConfirmationService } from '../../../components/notification/confirmations/confirmations.service';
import { KbResolveEmit } from '../../../components/notification/confirmations/interfaces/resolve-emit';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from '../../../components/notification/simple/services/notifications.service';

@Injectable()
export class KbNotificationService {
  constructor(public _service: NotificationsService,
              private _confirmation: KbConfirmationService,
              private _translate: TranslateService) {

  }

  alert(content: string, title?: string, override?: any) {
    this._service.alert(content, title, override);
  }

  bare(content: string, title?: string, override?: any) {
    this._service.bare(content, title, override);
  }

  error(content: string, title?: string, override?: any) {
    this._service.error(content, title, override);
  }

  info(content: string, title?: string, override?: any) {
    this._service.info(content, title, override);
  }

  removeConfirm(cb: () => void,
                afterDelete?: (param1?: any, param2?: any, param3?: any, param4?: any) => void,
                param1?: any,
                param2?: any,
                param3?: any,
                param4?: any) {
    const $tasks = [];
    $tasks.push(this._translate.get('notification.removeProcessTitle'));
    $tasks.push(this._translate.get('notification.removeProcessMessage'));
    $tasks.push(this._translate.get('notification.yes'));
    $tasks.push(this._translate.get('notification.no'));
    Observable.forkJoin(...$tasks).subscribe((messages: string[]) => {
      this._confirmation.create(messages[0], messages[1], {
        confirmText: messages[2],
        declineText: messages[3]
      }).subscribe((ans: KbResolveEmit) => {
        if (ans.resolved === true) {
          cb();
          if (afterDelete) {
            afterDelete(param1, param2, param3, param4);
          }
        } else {
          this._translate.get('notification.canceled').subscribe(successMessage => {
            this.info(successMessage);
          });
        }
      });
    });
  }

  removeConfirmObservable(cb: () => Observable<any>,
                          afterSuccesDelete?: (param1?: any, param2?: any, param3?: any, param4?: any) => void,
                          param1?: any,
                          param2?: any,
                          param3?: any,
                          param4?: any) {
    const $tasks = [];
    $tasks.push(this._translate.get('notification.removeProcessTitle'));
    $tasks.push(this._translate.get('notification.removeProcessMessage'));
    $tasks.push(this._translate.get('notification.yes'));
    $tasks.push(this._translate.get('notification.no'));
    Observable.forkJoin(...$tasks).subscribe((messages: string[]) => {
      this._confirmation.create(messages[0], messages[1], {
        confirmText: messages[2],
        declineText: messages[3]
      }).subscribe((ans: KbResolveEmit) => {
        if (ans.resolved === true) {
          const result: Observable<any> = cb();
          result.subscribe(res => {
            if (res.isSuccess) {
              this._translate.get('notification.removeSuccess').subscribe(successMessage => {
                this.success(successMessage);
              });
              afterSuccesDelete(param1, param2, param3, param4);
            } else {
              this.showKobipResultMessage(res);
            }
          });
        } else {
          this._translate.get('notification.canceled').subscribe(successMessage => {
            this.info(successMessage);
          });
        }
      });
    });
  }

  showKobipResultMessage(res: KbResultBase) {
    if (res.isSuccess) {
      this._translate.get('status.success').subscribe(mes => {
        this.success(mes);
      });
    } else if (res.status === 2) {
      if (res.message) {
        this._translate.get(res.message).subscribe(val => {
          this._translate.get('validation.required', {value: val})
            .subscribe(mes => {
              this.warn(mes);
            });
        });
      } else {
        this._translate.get('status.missingRequired').subscribe(mes => {
          this.warn(mes);
        });
      }
    } else if (res.status === -1 || res.status === 1 || res.status === 3 || res.status === 7 ||
      res.status === 8 || res.status === 9 || res.status === 12 || res.status === 13 ||
      res.status === 15 || res.status === 17 || res.status === 19 || res.status === 21 ||
      res.status === 22 || res.status === 23 || res.status === 24 || res.status === 25 ||
      res.status === 30 || res.status === 16) {
      this._translate.get('status.unknown').subscribe(mes => {
        this.error(mes);
      });
    } else if (res.status === 4) {
      this._translate.get('status.unauthorized').subscribe(mes => {
        this.error(mes);
      });
    } else if (res.status === 5) {
      this._translate.get('status.noSuchObject').subscribe(mes => {
        this.warn(mes);
      });
    } else if (res.status === 6) {
      if (res.message) {
        this._translate.get(res.message).subscribe(val => {
          this._translate.get('status.alreadyAddedWithValue', {value: val})
            .subscribe(mes => {
              this.warn(mes);
            });
        });
      } else {
        this._translate.get('status.alreadyAdded').subscribe(mes => {
          this.warn(mes);
        });
      }
    } else if (res.status === 10) {
      this._translate.get('status.loginFailed').subscribe(mes => {
        this.error(mes);
      });
    } else if (res.status === 11 || res.status === 14) {
      this._translate.get('status.sessionNotValid').subscribe(mes => {
        this.warn(mes);
      });
    } else if (res.status === 31 || res.status === 32) {
      this._translate.get('status.licenceCreditHasNoBalance').subscribe(mes => {
        this.warn(mes);
      });
    } else if (res.status === 18) {
      this._translate.get('status.alreadyDeleted').subscribe(mes => {
        this.error(mes);
      });
    } else if (res.status === 20) {
      this.warn(res.message);
    } else if (res.status === 26) {
      this._translate.get('status.rootMailNotVerified').subscribe(mes => {
        this.warn(mes);
      });
    } else if (res.status === 27) {
      this._translate.get('status.mailNotVerified').subscribe(mes => {
        this.warn(mes);
      });
    } else if (res.status === 28) {
      this._translate.get('status.passiveUser').subscribe(mes => {
        this.warn(mes);
      });
    } else if (res.status === 29) {
      this._translate.get('status.mailAlreadyVerified ').subscribe(mes => {
        this.warn(mes);
      });
    } else if (res.status === 31) {
      this._translate.get('status.licenceNotFound').subscribe(mes => {
        this.warn(mes);
      });
    } else if (res.status === 32) {
      this._translate.get('status.licenceCreditHasNoBalance').subscribe(mes => {
        this.warn(mes);
      });
    }
  }

  success(content: string, title?: string, override?: any) {
    this._service.success(content, title, override);
  }

  // confirm(message: string, title: string, cb: () => void, no?: () => void) {
  //   this.smartMessageBox({
  //     title: title,
  //     content: message,
  //     buttons: '[Hayır][Evet]'
  //   }, (buttonPressed) => {
  //     if (buttonPressed === 'Hayır') {
  //       if (isNullOrUndefined(no)) {
  //         this.smallBox({
  //           title: 'İptal İşlemi',
  //           content: '<i>İsteğiniz üzere iptal edilmiştir.</i>',
  //           color: '##296191',
  //           iconSmall: 'fa fa-check fa-2x fadeInRight animated',
  //           timeout: 4000
  //         });
  //       } else {
  //         no();
  //       }
  //     }
  //     if (buttonPressed === 'Evet') {
  //       cb();
  //     }
  //   });
  // }

  warn(content: string, title?: string, override?: any) {
    this._service.warn(content, title, override);
  }

}
