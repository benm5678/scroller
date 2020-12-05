import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocListExportDialogComponent } from '../doc-list-export-dialog/doc-list-export-dialog.component';
import { DocListImportDialogComponent } from '../doc-list-import-dialog/doc-list-import-dialog.component';

@Component({
  selector: 'app-doc-list-menu',
  templateUrl: './doc-list-menu.component.html',
  styleUrls: ['./doc-list-menu.component.css']
})
export class DocListMenuComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openImportDialog(): void {
    const dialogRef = this.dialog.open(DocListImportDialogComponent, {
      width: '350px',
      data: {  }
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(`Import Dialog closed`);
    });
  }

  openExportDialog(): void {
    const dialogRef = this.dialog.open(DocListExportDialogComponent, {
      width: '350px',
      data: {  }
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(`Export Dialog closed`);
    });
  }
}
