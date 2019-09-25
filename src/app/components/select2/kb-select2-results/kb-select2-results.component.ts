import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { KbSelect2Item } from '../kb-select2/kb-select2-item';

@Component({
  selector: 'kb-select2-results',
  templateUrl: './kb-select2-results.component.html',
  styleUrls: ['./kb-select2-results.component.css']
})
export class KbSelect2ResultsComponent implements OnInit {

  @Input() items: KbSelect2Item[];
  @Input() searchFocused: boolean;
  @Input() selectedItems: KbSelect2Item[];
  @Input() templateRef: TemplateRef<any>;
  @Output() itemSelectedEvent: EventEmitter<any> = new EventEmitter();
  activeIndex = 0;
  private ussingKeys = false;

  constructor() {
  }

  activeNext() {
    if (this.activeIndex >= this.items.length - 1) {
      this.activeIndex = this.items.length - 1;
    } else {
      this.activeIndex++;
    }
    this.scrollToElement();
    this.ussingKeys = true;
  }

  activePrevious() {
    if (this.activeIndex - 1 < 0) {
      this.activeIndex = 0;
    } else {
      this.activeIndex--;
    }
    this.scrollToElement();
    this.ussingKeys = true;
  }

  isSelected(currentItem) {
    let result = false;
    this.selectedItems.forEach(item => {
      if (item.id === currentItem.id) {
        result = true;
      }
    });
    return result;
  }

  ngOnInit() {
  }

  onHovering(event) {
    this.ussingKeys = false;
  }

  onItemSelected(item: KbSelect2Item) {
    this.itemSelectedEvent.emit(item);
  }

  onMouseOver(index: number) {
    if (!this.ussingKeys) {
      this.activeIndex = index;
    }
  }

  scrollToElement() {
    const element = document.getElementById('item_' + this.activeIndex);
    const container = document.getElementById('resultsContainer');

    if (element) {
      container.scrollTop = element.offsetTop;
    }
  }

  selectCurrentItem() {
    if (this.items[this.activeIndex]) {
      this.onItemSelected(this.items[this.activeIndex]);
      this.activeIndex = 0;
    }
  }

}
