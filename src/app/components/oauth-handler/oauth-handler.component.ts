import { DocListExportDialogComponent } from './../doc-list-export-dialog/doc-list-export-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  template: ''
})
export class OauthHandlerComponent {

    constructor(public dialog: MatDialog) {
      this.openDialog();
    }
    openDialog(): void {
      const dialogRef = this.dialog.open(DocListExportDialogComponent, {
        width: '350px'
      });
    }
  }
