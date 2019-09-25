import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  ExistingProvider,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectDropdownComponent } from './select-dropdown.component';
import { IOption } from './option.interface';
import { Option } from './option';
import { OptionList } from './option-list';
import { Observable } from 'rxjs/Observable';

export const SELECT_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};

@Component({
  selector: 'kb-select',
  templateUrl: './select.component.html',
  providers: [SELECT_VALUE_ACCESSOR]
})

export class SelectComponent implements ControlValueAccessor, OnChanges, OnInit, AfterViewInit {

  // Data input.
  @Input() options: Array<IOption> = [];
  @Input() observableOptions: Observable<IOption>;

  // Functionality settings.
  @Input() allowClear = false;
  @Input() css = '';
  @Input() useTranslation = true;
  @Input() disabled = false;
  @Input() multiple = false;
  @Input() noFilter = 0;

  // Style settings.
  @Input() highlightColor: string;
  @Input() highlightTextColor: string;

  // Text settings.
  @Input() placeholder = '';
  @Input() filterPlaceholder = '';
  @Input() display = '';

  // Output events.
  @Output() opened = new EventEmitter<null>();
  @Output() closed = new EventEmitter<null>();
  @Output() selected = new EventEmitter<IOption>();
  @Output() deselected = new EventEmitter<IOption | IOption[]>();
  @Output() focus = new EventEmitter<null>();
  @Output() blur = new EventEmitter<null>();
  @Output() noOptionsFound = new EventEmitter<string>();

  @ViewChild('selection') selectionSpan: ElementRef;
  @ViewChild('dropdown') dropdown: SelectDropdownComponent;
  @ViewChild('filterInput') filterInput: ElementRef;

  @ContentChild('optionTemplate') optionTemplate: TemplateRef<any>;
  // View state variables.
  hasFocus = false;
  isOpen = false;
  isBelow = true;
  private optionList: OptionList = new OptionList([]);
  private filterEnabled = true;
  private filterInputWidth = 1;
  private isDisabled = false;
  private placeholderView = '';
  private clearClicked = false;
  private selectContainerClicked = false;
  private optionListClicked = false;
  private optionClicked = false;
  // Width and position for the dropdown container.
  private width: number;
  private top: number;
  private left: number;
  private onChange = (_: any) => {
  }
  private onTouched = () => {
  }
  /** Keys. **/

  private KEYS: any = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    ESC: 27,
    SPACE: 32,
    UP: 38,
    DOWN: 40
  };

  constructor(private hostElement: ElementRef) {
  }

  private _id: Array<any> = [];

  /** Value. **/

  get id(): string | string[] {
    return this.multiple ? this._id : this._id[0];
  }

  set id(v: string | string[]) {
    if (typeof v === 'undefined' || v === null || v === '') {
      v = [];
    } else if (typeof v === 'string') {
      v = [v];
    } else if (!Array.isArray(v)) {
      throw new TypeError('Value must be a string or an array.');
    }

    this.optionList.id = v;
    this._id = v;
    this.updateState();
  }

  /** View. **/

  _blur() {
    if (this.hasFocus) {
      this.hasFocus = false;
      this.onTouched();
      this.blur.emit(null);
    }
  }

  _focus() {
    if (!this.hasFocus) {
      this.hasFocus = true;
      this.focus.emit(null);
    }
  }

  _focusSelectContainer() {
    this.selectionSpan.nativeElement.focus();
  }

  clear() {
    this.clearSelection();
  }

  close() {
    this.closeDropdown(false);
  }

  /** Event handlers. **/

  initObservableList() {
    if (this.observableOptions) {
      this.observableOptions.subscribe((res: any) => {
        this.updateOptionList(res);
      });
    }
  }

  ngAfterViewInit() {
    this.updateState();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.handleInputChanges(changes);
  }

  ngOnInit() {
    this.initObservableList();
    this.placeholderView = this.placeholder;
  }

  onClearSelectionClick(event: any) {
    this.clearClicked = true;
    this.clearSelection();
    this.closeDropdown(true);
  }

  onDeselectOptionClick(option: Option) {
    this.clearClicked = true;
    this.deselectOption(option);
  }

  onDropdownOptionClicked(option: Option) {
    this.optionClicked = true;
    this.multiple ? this.toggleSelectOption(option) : this.selectOption(option);
  }

  onFilterInput(term: string) {
    this.filter(term);
  }

  onMultipleFilterFocus() {
    this._focus();
  }

  onMultipleFilterKeydown(event: any) {
    this.handleMultipleFilterKeydown(event);
  }

  onOptionsListClick() {
    this.optionListClicked = true;
  }

  onSelectContainerClick(event: any) {
    this.selectContainerClicked = true;
    if (!this.clearClicked) {
      this.toggleDropdown();
    }
  }

  onSelectContainerFocus() {
    this._focus();
  }

  onSelectContainerKeydown(event: any) {
    this.handleSelectContainerKeydown(event);
  }

  onSingleFilterClick() {
    this.selectContainerClicked = true;
  }

  onSingleFilterFocus() {
    this._focus();
  }

  onSingleFilterKeydown(event: any) {
    this.handleSingleFilterKeydown(event);
  }

  @HostListener('window:blur')
  onWindowBlur() {
    this._blur();
  }

  @HostListener('window:click')
  onWindowClick() {
    if (!this.selectContainerClicked &&
      (!this.optionListClicked || (this.optionListClicked && this.optionClicked))) {
      this.closeDropdown(this.optionClicked);
      if (!this.optionClicked) {
        this._blur();
      }
    }
    this.clearClicked = false;
    this.selectContainerClicked = false;
    this.optionListClicked = false;
    this.optionClicked = false;
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.updateWidth();
  }

  /** API. **/

  // TODO fix issues with global click/key handler that closes the dropdown.
  open() {
    this.openDropdown();
  }

  registerOnChange(fn: (_: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  select(id: string | Array<string>) {
    this.writeValue(id);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  /** ControlValueAccessor interface methods. **/

  writeValue(id: any) {
    this.id = id;
  }

  private clearFilterInput() {
    if (this.multiple && this.filterEnabled) {
      this.filterInput.nativeElement.id = '';
    }
  }

  private clearSelection() {
    const selection: Array<Option> = this.optionList.selection;
    if (selection.length > 0) {
      this.optionList.clearSelection();
      this.valueChanged();

      if (selection.length === 1) {
        this.deselected.emit(selection[0].wrappedOption);
      } else {
        this.deselected.emit(selection.map(option => option.wrappedOption));
      }
    }
  }

  private closeDropdown(focus: boolean) {
    if (this.isOpen) {
      this.clearFilterInput();
      this.updateFilterWidth();
      this.isOpen = false;
      if (focus) {
        this._focusSelectContainer();
      }
      this.closed.emit(null);
    }
  }

  private deselectLast() {
    const sel: Array<Option> = this.optionList.selection;

    if (sel.length > 0) {
      const option: Option = sel[sel.length - 1];
      this.deselectOption(option);
      this.setMultipleFilterInput(option.display + ' ');
    }
  }

  private deselectOption(option: Option) {
    if (option.selected) {
      this.optionList.deselect(option);
      this.valueChanged();
      this.deselected.emit(option.wrappedOption);

      setTimeout(() => {
        if (this.multiple) {
          this.updatePosition();
          this.optionList.highlight();
          if (this.isOpen) {
            this.dropdown.moveHighlightedIntoView();
          }
        }
      });
    }
  }

  /** Filter. **/

  private filter(term: string) {
    if (this.multiple) {
      if (!this.isOpen) {
        this.openDropdown();
      }
      this.updateFilterWidth();
    }
    setTimeout(() => {
      const hasShown: boolean = this.optionList.filter(term);
      if (!hasShown) {
        this.noOptionsFound.emit(term);
      }
    });
  }

  /** Input change handling. **/

  private handleInputChanges(changes: SimpleChanges) {
    const optionsChanged: boolean = changes.hasOwnProperty('options');
    const noFilterChanged: boolean = changes.hasOwnProperty('noFilter');
    const placeholderChanged: boolean = changes.hasOwnProperty('placeholder');

    if (optionsChanged) {
      this.updateOptionList(changes['options'].currentValue);
    }
    if (optionsChanged || noFilterChanged) {
      this.updateFilterEnabled();
    }
    if (placeholderChanged) {
      this.updateState();
    }
  }

  private handleMultipleFilterKeydown(event: any) {
    const key = event.which;

    if (key === this.KEYS.BACKSPACE) {
      if (this.optionList.hasSelected && this.filterEnabled &&
        this.filterInput.nativeElement.id === '') {
        this.deselectLast();
      }
    }
  }

  private handleSelectContainerKeydown(event: any) {
    const key = event.which;

    if (this.isOpen) {
      if (key === this.KEYS.ESC || (key === this.KEYS.UP && event.altKey)) {
        this.closeDropdown(true);
      } else if (key === this.KEYS.TAB) {
        this.closeDropdown(event.shiftKey);
        this._blur();
      } else if (key === this.KEYS.ENTER) {
        this.selectHighlightedOption();
      } else if (key === this.KEYS.UP) {
        this.optionList.highlightPreviousOption();
        this.dropdown.moveHighlightedIntoView();
        if (!this.filterEnabled) {
          event.preventDefault();
        }
      } else if (key === this.KEYS.DOWN) {
        this.optionList.highlightNextOption();
        this.dropdown.moveHighlightedIntoView();
        if (!this.filterEnabled) {
          event.preventDefault();
        }
      }
    } else {
      // DEPRICATED --> SPACE
      if (key === this.KEYS.ENTER || key === this.KEYS.SPACE ||
        (key === this.KEYS.DOWN && event.altKey)) {

        /* FIREFOX HACK:
         *
         * The setTimeout is added to prevent the enter keydown event
         * to be triggered for the filter input field, which causes
         * the dropdown to be closed again.
         */
        setTimeout(() => {
          this.openDropdown();
        });
      } else if (key === this.KEYS.TAB) {
        this._blur();
      }
    }

  }

  private handleSingleFilterKeydown(event: any) {
    const key = event.which;

    if (key === this.KEYS.ESC || key === this.KEYS.TAB
      || key === this.KEYS.UP || key === this.KEYS.DOWN
      || key === this.KEYS.ENTER) {
      this.handleSelectContainerKeydown(event);
    }
  }

  private openDropdown() {
    if (!this.isOpen) {
      this.updateWidth();
      this.updatePosition();
      this.isOpen = true;
      if (this.multiple && this.filterEnabled) {
        this.filterInput.nativeElement.focus();
      }
      this.opened.emit(null);
    }
  }

  private selectHighlightedOption() {
    const option: Option = this.optionList.highlightedOption;
    if (option !== null) {
      this.selectOption(option);
      this.closeDropdown(true);
    }
  }

  /** Select. **/

  private selectOption(option: Option) {
    if (!option.selected && !option.disabled) {
      this.optionList.select(option, this.multiple);
      this.valueChanged();
      this.selected.emit(option.wrappedOption);
    }
  }

  private setMultipleFilterInput(id: string) {
    if (this.filterEnabled) {
      this.filterInput.nativeElement.id = id;
    }
  }

  /** Dropdown. **/

  private toggleDropdown() {
    if (!this.isDisabled) {
      this.isOpen ? this.closeDropdown(true) : this.openDropdown();
    }
  }

  private toggleSelectOption(option: Option) {
    option.selected ? this.deselectOption(option) : this.selectOption(option);
  }

  private updateFilterEnabled() {
    this.filterEnabled = this.optionList.options.length >= this.noFilter;
  }

  private updateFilterWidth() {
    if (typeof this.filterInput !== 'undefined') {
      const id: string = this.filterInput.nativeElement.id;
      this.filterInputWidth = id.length === 0 ?
        1 + this.placeholderView.length * 10 : 1 + id.length * 10;
    }
  }

  private updateOptionList(options: Array<IOption>) {
    this.optionList = new OptionList(options);
    this.optionList.id = this._id;
  }

  private updatePosition() {
    const hostRect = this.hostElement.nativeElement.getBoundingClientRect();
    const spanRect = this.selectionSpan.nativeElement.getBoundingClientRect();
    this.left = spanRect.left - hostRect.left;
    this.top = (spanRect.top - hostRect.top) + spanRect.height;
  }

  private updateState() {
    this.placeholderView = this.optionList.hasSelected ? '' : this.placeholder;
    this.updateFilterWidth();
  }

  private updateWidth() {
    this.width = this.selectionSpan.nativeElement.getBoundingClientRect().width;
  }

  private valueChanged() {
    this._id = this.optionList.id;
    this.updateState();
    this.onChange(this.id);
  }
}
