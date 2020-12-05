import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from 'src/app/helpers/utils';
import { DocListExportDialogComponent } from '../doc-list-export-dialog/doc-list-export-dialog.component';
import { DocListImportDialogComponent } from '../doc-list-import-dialog/doc-list-import-dialog.component';

@Component({
  selector: 'app-doc-list-menu',
  templateUrl: './doc-list-menu.component.html',
  styleUrls: ['./doc-list-menu.component.css']
})
export class DocListMenuComponent implements OnInit {
  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    // Check if we just got OAuth
    this.route.data.subscribe(data => {
      if (data.gotDropboxAuth){
        // Got OAuth, let's get token and show Export dialog again
        const dropboxToken = Utils.getAccessTokenFromUrl();
        this.openExportDialog(dropboxToken);
        // Navigate back to root to remove the token from URL
        this.router.navigate(['/']);
      }
    });
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

  openExportDialog(dropboxToken?: string): void {
    const dialogRef = this.dialog.open(DocListExportDialogComponent, {
      width: '350px',
      data: { dropboxToken }
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(`Export Dialog closed`);
    });
  }
}
