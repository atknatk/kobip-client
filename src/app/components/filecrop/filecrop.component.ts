import { Attribute, Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs/util/noop';
import { isNullOrUndefined } from 'util';
import { FileUploadService } from '../../shared/services/fileupload/file-upload.service';
import { NotificationsService } from '../notification/simple/services/notifications.service';
import { KbNotificationService } from '../../shared/services/notification/notification.service';

declare var $: any;


@Component({
  selector: 'kb-filecrop',
  template: `

    <div class="modal fade" id="fuModal" tabindex="-1">
      <div class="modal-dialog modal-image">
        <div class="modal-content">
          <kb-loading [show]="loading">
            <div class="modal-header">
              <!--<h5 class="modal-title" id="exampleModalLabel">Crop and Upload</h5>-->
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" style="background-color: #f3f3f4;">
              <div class="row">
                <div class="col-md-12">
                  <div class="image-crop">
                    <img [src]="dataSrc">
                  </div>
                </div>
              </div>
              <div id="img-preview" class="hide"></div>
            </div>
            <div class="modal-footer">
              <div class="btn-group" style="float: left">
                <label title="Upload image file" for="inputImage" class="btn btn-primary">
                  <input type="file" accept="image/*" name="file" id="inputImage" class="hide">
                  <i class="fa fa-upload"></i>
                </label>
                <button class="btn btn-white" id="zoomIn" type="button"><i class="fa fa-search-plus"></i></button>
                <button class="btn btn-white" id="zoomOut" type="button"><i class="fa fa-search-minus"></i></button>
                <button class="btn btn-white" id="rotateLeft" type="button"><i class="fa fa-repeat"></i></button>
                <button class="btn btn-white" id="rotateRight" type="button"><i class="fa fa-undo"></i></button>
              </div>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">{{'app.general.close' | translate}}
              </button>
              <button type="button" id="upload-image" class="btn btn-primary">{{'app.general.save' | translate}}
              </button>
            </div>
          </kb-loading>
        </div>
      </div>
    </div>
  `
})
export class KbFileCropComponent implements OnInit {
  @Input() dataSrc = 'assets/kb_img/kb_profil/no_avatar_transparent.png';
  @Output() uploadFinishEvent = new EventEmitter();
  loading = false;
  private fuModal;
  @Input() aspectRatio = 1;
  private isCreateCropper = false;
  private cropperOption = {
    aspectRatio: this.aspectRatio,
    preview: '.img-preview'
  };


  constructor(private _fu: FileUploadService,
              private _nf: KbNotificationService) {

  }

  createCrop() {
    if (this.isCreateCropper === true) {
      return;
    }
    this.isCreateCropper = true;
    const $image = $('.image-crop > img');
    const $inputImage = $('#inputImage');
    const that = this;
    $($image).cropper(this.cropperOption);

    $inputImage.change(function () {
      const fileReader = new FileReader(),
        files = this.files;
      let file;
      if (!files.length) {
        return;
      }

      file = files[0];

      if (/^image\/\w+$/.test(file.type)) {
        fileReader.readAsDataURL(file);
        fileReader.onload = function () {
          $inputImage.val('');
          $image.cropper('reset', true).cropper('replace', this.result);
          $().cropper('setAspectRatio', 1);
        };
      } else {
        // showMessage('Please choose an image file.');
      }
    });

    $('#upload-image').click(() => {
      this.loading = true;

      this._fu.uploadDataUri('profile_image', $image.cropper('getDataURL')).subscribe(result => {
        if (result.isSuccess) {
          this.closeModal();
          this.uploadFinishEvent.emit(result.data);
        } else {
          this._nf.showKobipResultMessage(result);
        }
        this.loading = false;
      });
    });

    $('#zoomIn').click(function () {
      $image.cropper('zoom', 0.1);
    });

    $('#zoomOut').click(function () {
      $image.cropper('zoom', -0.1);
    });

    $('#rotateLeft').click(function () {
      $image.cropper('rotate', 90);
    });

    $('#rotateRight').click(function () {
      $image.cropper('rotate', -90);
    });

    $('#setDrag').click(function () {
      $image.cropper('setDragMode', 'crop');
    });
  }

  ngOnInit(): void {
    this.fuModal = $('#fuModal').modal('hide');
    this.initializeInputImage();
  }

  openFileUpload(dataSrc?) {
    if (dataSrc) {
      const $inputImage = $('#inputImage');
      $inputImage.val('');
      const $image = $('.image-crop > img');
      $image.attr('src', dataSrc);
     // $image.cropper('reset', true).cropper('replace', dataSrc);
      $image.cropper('destroy').cropper(this.cropperOption);
      $().cropper('setAspectRatio', this.aspectRatio);
      $image.cropper('setAspectRatio', this.aspectRatio);
        this.dataSrc = dataSrc;
    }
    this.createCrop();
    this.fuModal.modal('show');
  }


  private closeModal() {
    this.fuModal.modal('hide');
  }


  private initializeInputImage() {
    const $image = $('.image-crop > img');
    /*  if (window.FileReader) {*/

  }

}
