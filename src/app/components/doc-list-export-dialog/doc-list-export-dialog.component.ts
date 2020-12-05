import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocManagerService } from 'src/app/services/doc-manager.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var Dropbox: any;

@Component({
  selector: 'app-doc-list-export-dialog',
  templateUrl: './doc-list-export-dialog.component.html',
  styleUrls: ['./doc-list-export-dialog.component.css']
})
export class DocListExportDialogComponent implements OnInit {
  selectedTarget = 'Dropbox';
  dropboxClientId = '1bqptfh6hqy4tok';
  dropboxFileName = '/ScrollerDb';
  dropboxToken: string;
  dropboxAuthUrl: string;
  dropboxTokenCookie = 'dropboxToken';

  constructor(public dialogRef: MatDialogRef<DocListExportDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {dropboxToken: string},
              private docManagerService: DocManagerService,
              private cookieService: CookieService,
              private snackBar: MatSnackBar)
  {

    const dbx = new Dropbox({ clientId: this.dropboxClientId });
    this.dropboxAuthUrl = dbx.getAuthenticationUrl(`${location.origin}/auth-dropbox`);
    this.dropboxToken = data.dropboxToken;
    if (!this.dropboxToken){
      this.dropboxToken = this.cookieService.get(this.dropboxTokenCookie);
    }else{
      this.cookieService.set(this.dropboxTokenCookie, this.dropboxToken, 30, null, null, true, 'Lax');
    }
  }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onExportTargetChange(): void{

  }

  onExportClick(): void{
    switch (this.selectedTarget){
      case 'Dropbox':
        this.saveToDropbox();
        break;
      case 'GoogleDrive':
        this.showMsg('Google Drive is not supported yet!');
        break;
      default:
        this.showMsg('Select an export target!');
    }
  }

  showMsg(msg: string): void{
    this.snackBar.open(msg, null, {
      duration: 5000,
    });
  }

  saveToDropbox(): void {
    // export to JSON, clear database, and import from JSON
    this.docManagerService.getDocItemsFromDb().subscribe((docItems) => {
      console.log(`saving ${docItems.length} docs from db`);

      const dbx = new Dropbox({ accessToken: this.dropboxToken });
      dbx.filesUpload({contents: JSON.stringify(docItems),
        path: `${this.dropboxFileName}.${new Date().getTime()}.json`, mode: {'.tag': 'overwrite'}, autorename: false, mute: true })
        .then((response: any) => {
          alert('Saved successfully!');
          console.log('Saved data to Dropbox', response);
      }).catch((error: any) => {
        // Error most likely auth issue, show error & clear cached token
        console.log(JSON.stringify(error));
        this.showMsg(`Failed to save to dropbox - try to authenticate again`);
        this.cookieService.delete(this.dropboxTokenCookie, null);
        this.dropboxToken = null;
      });
    }, (err) => {
      this.showMsg('Failed to export local Db');
    });
  }

}

