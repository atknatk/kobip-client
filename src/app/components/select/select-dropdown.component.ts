import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Option } from './option';
import { OptionList } from './option-list';

@Component({
  selector: 'kb-select-dropdown',
  templateUrl: './select-dropdown.component.html'
})

export class SelectDropdownComponent
  implements AfterViewInit, OnChanges, OnInit {

  @Input() filterEnabled: boolean;
  @Input() highlightColor: string;
  @Input() highlightTextColor: string;
  @Input() left: number;
  @Input() multiple: boolean;
  @Input() optionList: OptionList;
  @Input() top: number;
  @Input() width: number;
  @Input() placeholder: string;
  @Input() optionTemplate: TemplateRef<any>;
  @Input() useTranslation = true;

  @Output() optionClicked = new EventEmitter<Option>();
  @Output() optionsListClick = new EventEmitter<null>();
  @Output() singleFilterClick = new EventEmitter<null>();
  @Output() singleFilterFocus = new EventEmitter<null>();
  @Output() singleFilterInput = new EventEmitter<string>();
  @Output() singleFilterKeydown = new EventEmitter<any>();

  @ViewChild('filterInput') filterInput: any;
  @ViewChild('optionsList') optionsList: any;

  disabledColor = '#fff';
  disabledTextColor = '9e9e9e';

  /** View. **/

  getOptionStyle(option: Option): any {
    if (option.highlighted) {
      const style: any = {};

      if (typeof this.highlightColor !== 'undefined') {
        style['background-color'] = this.highlightColor;
      }
      if (typeof this.highlightTextColor !== 'undefined') {
        style['color'] = this.highlightTextColor;
      }
      return style;
    } else {
      return {};
    }
  }

  moveHighlightedIntoView() {

    const list = this.optionsList.nativeElement;
    const listHeight = list.offsetHeight;

    const itemIndex = this.optionList.getHighlightedIndex();

    if (itemIndex > -1) {
      const item = list.children[0].children[itemIndex];
      const itemHeight = item.offsetHeight;

      const itemTop = itemIndex * itemHeight;
      const itemBottom = itemTop + itemHeight;

      const viewTop = list.scrollTop;
      const viewBottom = viewTop + listHeight;

      if (itemBottom > viewBottom) {
        list.scrollTop = itemBottom - listHeight;
      } else if (itemTop < viewTop) {
        list.scrollTop = itemTop;
      }
    }
  }

  ngAfterViewInit() {
    this.moveHighlightedIntoView();
    if (!this.multiple && this.filterEnabled) {
      this.filterInput.nativeElement.focus();
    }
  }

  ngOnChanges(changes: any) {
    if (changes.hasOwnProperty('optionList')) {
      this.optionsReset();
    }
  }

  /** Event handlers. **/

  ngOnInit() {
    this.optionsReset();
  }

  onOptionClick(option: Option) {
    this.optionClicked.emit(option);
  }

  onOptionMouseover(option: Option) {
    this.optionList.highlightOption(option);
  }

  onOptionsListClick() {
    this.optionsListClick.emit(null);
  }

  onOptionsWheel(event: any) {
    this.handleOptionsWheel(event);
  }


  onSingleFilterClick() {
    this.singleFilterClick.emit(null);
  }

  onSingleFilterFocus() {
    this.singleFilterFocus.emit(null);
  }

  onSingleFilterInput(event: any) {
    this.singleFilterInput.emit(event.target.id);
  }

  onSingleFilterKeydown(event: any) {
    this.singleFilterKeydown.emit(event);
  }

  private handleOptionsWheel(e: any) {
    const div = this.optionsList.nativeElement;
    const atTop = div.scrollTop === 0;
    const atBottom = div.offsetHeight + div.scrollTop === div.scrollHeight;
   if (atTop && e.deltaY < 0) {
      e.preventDefault();
    } else if (atBottom && e.deltaY > 0) {
      e.preventDefault();
    }
  }

  /** Initialization. **/

  private optionsReset() {
    this.optionList.filter('');
    this.optionList.highlight();
  }
}
