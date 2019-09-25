import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

declare const $: any;

@Component({
  selector: 'kb-new-posting-delivery',
  templateUrl: './new-posting-delivery.component.html'
})
export class NewPostingDeliveryComponent implements OnInit {
  @Input() form: FormGroup;

  ngOnInit(): void {
  }

}


