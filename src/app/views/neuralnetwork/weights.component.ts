import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog.component';
import { UploadService } from './upload.service';
import { ApiService } from './api.service';

@Component({
  templateUrl: 'weights.component.html',
  styleUrls: ['./weights.component.css']
})
export class WeightsComponent implements OnInit, OnDestroy {
  constructor(public dialog: MatDialog, public uploadService: UploadService, public api: ApiService) { }

  public openUploadDialog() {
    let dialogRef = this.dialog.open(DialogComponent, { width: '50%', height: '50%' });
  }

  public confirm() {
    this.api.confirm().subscribe(
      (result) => {
        console.log(result);
        console.log("Actualizado correctamente");
        this.uploadService.file = null;
      }, (err) => {
        console.log(err);
      }
    )
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.uploadService.file = null;
  }

}
