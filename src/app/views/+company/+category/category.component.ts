import { Component } from '@angular/core';

@Component({
  templateUrl: 'category.component.html',
})
export class CategoryComponent {

  salesSelectedList = [];

  categorySelectedListEvent(data: any[]) {
    this.salesSelectedList = data;
  }

}
