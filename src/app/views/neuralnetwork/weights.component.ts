import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog.component';
import { UploadService } from './upload.service';
import { ApiService } from './api.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'weights.component.html',
  styleUrls: ['./weights.component.css']
})
export class WeightsComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;
  constructor(public dialog: MatDialog, public uploadService: UploadService, public api: ApiService, private modalService: BsModalService) { }

  public openUploadDialog() {
    let dialogRef = this.dialog.open(DialogComponent, { width: '50%', height: '50%' });
  }

  public confirm() {
    this.bsModalRef = this.modalService.show(ModalConfirmComponent, { class: 'modal-danger' });
    this.bsModalRef.content.closeBtnName = 'Cerrar';
    // this.api.confirm().subscribe(
    //   (result) => {
    //     console.log(result);
    //     console.log("Actualizado correctamente");
    //     this.uploadService.file = null;
    //   }, (err) => {
    //     console.log(err);
    //   }
    // )
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.uploadService.file = null;
  }

}


@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">Confirmar Subida</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      ¿Está seguro que quiere subir este archivo?
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" (click)="subir()">Subir</button>
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">{{closeBtnName}}</button>
    </div>
  `
})

export class ModalConfirmComponent implements OnInit, OnDestroy {
  closeBtnName: string;


  constructor(public bsModalRef: BsModalRef, public api: ApiService, public uploadService: UploadService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  subir() {
    this.api.confirm().subscribe(
      (result) => {
        console.log(result);
        console.log("Actualizado correctamente");
        this.uploadService.success = true;
        setTimeout(() => {
          this.uploadService.success = false;
        }, 5000);
        this.uploadService.file = null;
      }, (err) => {
        this.uploadService.failed = true;
        setTimeout(() => {
          this.uploadService.failed = false;
        }, 5000);
        console.log(err);
      }
    )
    this.bsModalRef.hide();
  }
}