import { AfterViewInit, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { KbHttpService } from '../../../../shared/services/http/http.service';
import 'bootstrap-datepicker';
import { TranslateService } from '@ngx-translate/core';
import { KbDuallistComponent } from '../../../../components/duallist/duallist.component';
import { KbEnumService } from '../../../../shared/services/enum/enum.service';

declare const $: any;

@Component({
  selector: 'kb-new-posting-general',
  templateUrl: './new-posting-general.component.html'
})
export class NewPostingGeneralComponent implements OnInit, AfterViewInit {
  @Input() postingForm: FormGroup;
  employeeObservable: Observable<any>;
  showDateIcon = true;
  showCountryList = true;
  term = new FormControl();

  @ViewChild('country') country: KbDuallistComponent;

  constructor(private _http: KbHttpService,
              private _enum: KbEnumService,
              private _translate: TranslateService) {

  }

  loadCountry() {
    this._enum.country().subscribe(val => {
      this.country.leftList.push(...val);
    });
  }

  ngAfterViewInit(): void {
    $('#posting-expire-at').datepicker({
      language: this._translate.currentLang,
      autoclose: true
    });
    // this.showDateIcon = this.isHidden(window.screen.width);
    this.loadCountry();
  }

  ngOnInit(): void {
    this.employeeObservable = this._http.get('Employee/Combo').map(res => {
      if (res.isSuccess) {
        return res.data;
      } else {
        // TODO employee çekilemez ise uyarı ver
        return [];
      }
    });

    this.term.valueChanges.subscribe(value => this.showCountryList = !value);
  }


}
