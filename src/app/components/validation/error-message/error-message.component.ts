import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ErrorMessageResource } from './models/error-message';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kb-error-message',
  template: `
    <div [@enterAnimation]="errorMessage"
         class="invalid"
         *ngIf="(control.touched || control.dirty) && control.invalid && errorMessage">{{ errorMessage }}
    </div>`,
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(-5px)', opacity: 0}),
          animate('300ms', style({transform: 'translateY(0)', opacity: 1})),
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('300ms', style({transform: 'translateY(-5px)', opacity: 0})),
        ]),
      ],
    ),
  ],
})
export class KbErrorMessageComponent implements OnDestroy, OnInit {

  @Input() control: AbstractControl;
  @Input() errorMessageResource: ErrorMessageResource;
  @Input() errorMessageResourceParam: string;

  controlStatusChangesSubscription: Subscription;
  errorMessage = '';

  constructor() {
  }

  buildErrorMessage() {
    this.errorMessage = '';
    if (this.control.errors && this.errorMessageResource) {
      const errors = this.control.errors;
      Object.keys(errors).forEach(key => {
        const message = this.errorMessageResource[key];
        if (key === 'maxlength' && message && message.indexOf('maxlength') > -1) {
          this.errorMessageResource[key] = message.replace('{{maxlength}}', errors[key].requiredLength);
        }

        if (key === 'minlength' && message && message.indexOf('minlength') > -1) {
          this.errorMessageResource[key] = message.replace('{{minlength}}', errors[key].requiredLength);
        }

        // this.errorMessage += this.errorMessageResource[key] + ' ';
        if (this.errorMessage === '') {
          this.errorMessage = this.errorMessageResource[key];
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.controlStatusChangesSubscription.unsubscribe();
  }

  ngOnInit() {
    this.buildErrorMessage();
    this.controlStatusChangesSubscription = this.control.statusChanges.subscribe(() => this.buildErrorMessage());
  }
}
