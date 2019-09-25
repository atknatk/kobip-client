import { Directive, OnInit, ElementRef, Input } from '@angular/core';
import 'inputmask/dist/jquery.inputmask.bundle';
import 'inputmask/dist/inputmask/inputmask';
import 'inputmask/dist/inputmask/inputmask.extensions';
import 'inputmask/dist/inputmask/jquery.inputmask';
import 'inputmask/dist/inputmask/inputmask.phone.extensions';
import Inputmask from 'inputmask/dist/inputmask/phone-codes/phone';

declare var $: any

@Directive({
  selector: '[mask]',
})
export class MaskDirective implements OnInit {
  @Input()
  mask: any;
  @Input()
  maskOptions: any = {};

  constructor(private _el: ElementRef) {

  }

  ngOnInit(): void {
    const option = $.extend(this.maskOptions, {
      'clearIncomplete': true
    });
    const im = new Inputmask(this.mask, option);
    im.mask(this._el.nativeElement);
  }

}
