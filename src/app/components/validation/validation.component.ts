import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Renderer,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ErrorMessageResource } from './error-message/models/error-message';
import { KbErrorMessageComponent } from './error-message/error-message.component';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined } from 'util';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'kb-validation, [kb-validation], [kbValidation]',
  template: '<ng-content></ng-content>',
})
export class KbValidationComponent implements AfterViewInit, OnDestroy {
  errorMessageComponent?: ComponentRef<KbErrorMessageComponent> = null;
  labelElement: HTMLElement;
  nativeElement: JQuery;
  statusChangesSubscription: Subscription;
  // native properties
  @Input() id: string;
  // component properties
  @Input() errorMessageResource: ErrorMessageResource;
  @Input() errorMessageResourceParam: any;
  // @Input() errorMessageResourceRequired: string;
  // @Input() errorMessageResourceMaxlength: string;
  // @Input() errorMessageResourceMinlength: string;
  // @Input() errorMessageResourcePattern: string;

  constructor(private elementRef: ElementRef,
              private resolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private _translateService: TranslateService,
              public ngControl: NgControl,
              public renderer: Renderer) {
  }

  private _formControlDisabled = false;

  @Input()
  get formControlDisabled() {
    return this._formControlDisabled;
  }

  set formControlDisabled(value: boolean) {
    this._formControlDisabled = value;
    if (this._formControlDisabled) {
      this.ngControl.control.disable();
    } else {
      this.ngControl.control.enable();
    }
  }

  private _required = false;

  @HostBinding('attr.required')
  @Input()
  get required() {
    return this._required;
  }

  set required(value: any) {
    this._required = (value != null && `${value}` !== 'false');
  }

  get elementToAddValidation(): JQuery {
    return this.isNativeSelectElement
      ? this.inputSelectDropdown
      : this.nativeElement;
  }

  get inputSelectDropdown(): JQuery {
    return this.nativeElement.siblings('input.select-dropdown');
  }

  get isNativeSelectElement(): boolean {
    return this.nativeElement[0].nodeName === 'SELECT';
  }

  @HostListener('focusout', ['$event.target'])
  onFocusOut(target: Event) {
    this.ngControl.control.markAsTouched();
    this.setValidationState();
  }

  ngAfterViewInit() {
    this.initElements();
    /*    setTimeout(() => {
       this.initErrorMessageComponent();
        this.subscribeStatusChanges();
        }, 500);*/
    this.initErrorMessageComponent();
    this.subscribeStatusChanges();
  }

  ngOnDestroy() {
    this.statusChangesSubscription.unsubscribe();
    this.errorMessageComponent.destroy();
  }

  clearValidationState(element: JQuery) {
    this.renderer.setElementClass(element[0], 'valid', false);
    this.renderer.setElementClass(element[0], 'invalid', false);
  }

  createRequiredSpanElement() {
    if (this.required && this.labelElement) {
      const spanElement = document.createElement('span');
      spanElement.setAttribute('class', 'placeholder-required');
      spanElement.textContent = ' *';
      this.renderer.invokeElementMethod(this.labelElement, 'appendChild', [spanElement]);
    }
  }

  initElements() {
    this.labelElement = $('label[for="' + this.id + '"]')[0];
    this.nativeElement = $(this.elementRef.nativeElement);
    this.createRequiredSpanElement();
  }

  initErrorMessageComponent() {
    const errorMessageFactory = this.resolver.resolveComponentFactory(KbErrorMessageComponent);
    this.errorMessageComponent = this.viewContainerRef.createComponent(errorMessageFactory);
    // if (isNullOrUndefined(this.errorMessageResource)) {
    //   if (this.errorMessageResourceMaxlength || this.errorMessageResourceMinlength
    //     || this.errorMessageResourceRequired || this.errorMessageResourcePattern) {
    //     this.errorMessageResource = {};
    //     if (this.errorMessageResourceMaxlength) {
    //       this.errorMessageResource['maxlength'] = this.fixedParam(this.errorMessageResourceMaxlength);
    //     }
    //     if (this.errorMessageResourceMinlength) {
    //       this.errorMessageResource['minlength'] = this.fixedParam(this.errorMessageResourceMinlength);
    //     }
    //     if (this.errorMessageResourceRequired) {
    //       this.errorMessageResource['required'] = this.fixedParam(this.errorMessageResourceRequired);
    //     }
    //     if (this.errorMessageResourcePattern) {
    //       this.errorMessageResource['pattern'] = this.fixedParam(this.errorMessageResourcePattern);
    //     }
    //     this.errorMessageComponent.instance.errorMessageResource = this.errorMessageResource;
    //   }
    //
    // } else {
    //   this.errorMessageComponent.instance.errorMessageResource = this.errorMessageResource;
    // }

    // if (this.errorMessageResourceParam) {
    //   this._translateService.get(this.errorMessageResourceParam).subscribe((res: string) => {
    //     this.errorMessageComponent.instance.errorMessageResource = {};
    //     this._translateService.get('validation.required', {value: res}).subscribe((message: string) => {
    //       this.errorMessageComponent.instance.errorMessageResource['required'] = message;
    //     });
    //     this._translateService.get('validation.maxlength', {value: res}).subscribe((message: string) => {
    //       this.errorMessageComponent.instance.errorMessageResource['maxlength'] = message;
    //     });
    //     this._translateService.get('validation.minlength', {value: res}).subscribe((message: string) => {
    //       this.errorMessageComponent.instance.errorMessageResource['minlength'] = message;
    //     });
    //     this._translateService.get('validation.email', {value: res}).subscribe((message: string) => {
    //       this.errorMessageComponent.instance.errorMessageResource['email'] = message;
    //     });
    //   });
    //   this.errorMessageComponent.instance.errorMessageResourceParam = this.errorMessageResourceParam;
    // }
    this.errorMessageComponent.instance.errorMessageResource = {};
    this._translateService.get('validation.required').subscribe((message: string) => {
      this.errorMessageComponent.instance.errorMessageResource['required'] = message;
    });

    this._translateService.get('validation.maxlength').subscribe((message: string) => {
      this.errorMessageComponent.instance.errorMessageResource['maxlength'] = message;
    });
    this._translateService.get('validation.minlength').subscribe((message: string) => {
      this.errorMessageComponent.instance.errorMessageResource['minlength'] = message;
    });

    this._translateService.get('validation.email').subscribe((message: string) => {
      this.errorMessageComponent.instance.errorMessageResource['email'] = message;
    });

    this._translateService.get('validation.equalPassword').subscribe((message: string) => {
      this.errorMessageComponent.instance.errorMessageResource['validateEqual'] = message;
    });

    this.errorMessageComponent.instance.control = this.ngControl.control;
    this.errorMessageComponent.changeDetectorRef.detectChanges();

    const errorMessage = this.nativeElement.parent().children('kb-error-message');
    this.renderer.invokeElementMethod(errorMessage, 'insertAfter', [this.labelElement]);
  }

  setValidationState() {
    // to handle reset form
    if (this.ngControl.control.untouched && this.ngControl.control.pristine) {
      this.clearValidationState(this.elementToAddValidation);
      return;
    }
    // to handle field validity
    if (this.ngControl.control.enabled) {
      if (this.ngControl.control.valid) {
        this.renderer.setElementClass(this.elementToAddValidation[0], 'valid', true);
        this.renderer.setElementClass(this.elementToAddValidation[0], 'invalid', false);
      } else {
        this.renderer.setElementClass(this.elementToAddValidation[0], 'valid', false);
        this.renderer.setElementClass(this.elementToAddValidation[0], 'invalid', true);
      }
    } else {
      this.clearValidationState(this.elementToAddValidation);
    }
  }

  subscribeStatusChanges() {
    this.statusChangesSubscription = this.ngControl.control.statusChanges.subscribe((status: string) => {
      setTimeout(() => this.setValidationState());
    });
  }

  // private fixedParam(val: string) {
  //   if (isNullOrUndefined(this.errorMessageResourceParam) || isNullOrUndefined(val)) {
  //     return val;
  //   }
  //   if (this.errorMessageResourceParam) {
  //     return val.replace('{{value}}', this.errorMessageResourceParam);
  //   }
  //   return val;
  // }

}
