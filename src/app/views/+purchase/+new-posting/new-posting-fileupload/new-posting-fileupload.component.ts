import { Component, EventEmitter, forwardRef, HostListener, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isArray } from 'util';
import { KbLoggerService } from '../../../../shared/services/log/logger.service';
import { FileUploadService } from '../../../../shared/services/fileupload/file-upload.service';

declare const $: any;

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NewPostingFileuploadComponent),
  multi: true
};

@Component({
  selector: 'kb-new-posting-fileupload',
  templateUrl: './new-posting-fileupload.component.html',
  providers: [VALUE_ACCESSOR]
})
export class NewPostingFileuploadComponent implements OnInit, ControlValueAccessor {
  errors: Array<string> = [];
  dragAreaClass = 'dragarea';
  @Input() projectId: number;
  @Input() sectionId: number;
  @Input() fileExt = 'JPG, GIF, PNG';
  @Input() maxFiles = 5;
  @Input() maxSize = 5; // 5MB
  @Output() uploadStatus = new EventEmitter();
  values: any[] = [];
  ids: any[] = [];
  onChangeCallback: any = () => {
  }

  constructor(private _fu: FileUploadService,
              private _log: KbLoggerService) {
  }

  imageNext(values, index) {
    if (index === values.length - 1) {
      return 0;
    }
    return index + 1;
  }

  imagePrev(values, index) {
    if (index === 0) {
      return values.length - 1;
    }
    return index - 1;
  }

  ngOnInit() {
    this._log.debug('NewPostingFileuploadComponent was initializing');
  }

  @HostListener('dragend', ['$event']) onDragEnd(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }

  @HostListener('dragenter', ['$event']) onDragEnter(event) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }

  @HostListener('dragover', ['$event']) onDragOver(event) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) onDrop(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    this.saveFiles(files);
  }

  onFileChange(event) {
    const files = event.target.files;
    this.saveFiles(files);
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
  }

  saveFiles(files) {
    if (files.length > 0) {
      for (let j = 0; j < files.length; j++) {
        this._fu.upload(files[j]).subscribe(result => {
          if (result.isSuccess) {
            this.values.push({
              path: result.data.path,
              name: files[j].name
            });
            this.ids.push(result.objectId);
            this._log.debug(files[j].name, ' saved to storage.');
            this.onChangeCallback(this.ids);
          }
        });
      }
    }
  }

  writeValue(value: any): void {
    if (value && isArray(value)) {
      this.ids = value;
    }
  }

  private isValidFileExtension(files) {
    // Make array of file extensions
    const extensions = (this.fileExt.split(','))
      .map(function (x) {
        return x.toLocaleUpperCase().trim();
      });

    for (let i = 0; i < files.length; i++) {
      // Get file extension
      const ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
      // Check the extension exists
      const exists = extensions.includes(ext);
      if (!exists) {
        this.errors.push('Error (Extension): ' + files[i].name);
      }
      // Check file size
      this.isValidFileSize(files[i]);
    }
  }

  private isValidFileSize(file) {
    const fileSizeinMB = file.size / (1024 * 1000);
    const size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
    if (size > this.maxSize) {
      this.errors.push(`Error (File Size): ${file.name} : exceed file size limit of ${this.maxSize} MB ( ${size}MB`);
    }
  }

  private isValidFiles(files) {
    // Check Number of files
    if (files.length > this.maxFiles) {
      this.errors.push('Error: At a time you can upload only ' + this.maxFiles + ' files');
      return;
    }
    this.isValidFileExtension(files);
    return this.errors.length === 0;
  }

}


