import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocImportDialogComponent } from '../doc-import-dialog/doc-import-dialog.component';

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
    const importDialogRef = this.dialog.open(DocImportDialogComponent, {
      width: '350px',
      data: {  }
    });
    importDialogRef.afterClosed().subscribe(reload => {
      console.log(`Import Dialog | reload: ${reload}`);
    });
  }
}
