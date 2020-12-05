import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DocManagerService } from 'src/app/services/doc-manager.service';
import { CookieService } from 'ngx-cookie-service';
import { Utils } from 'src/app/helpers/utils';
declare var Dropbox: any;

@Component({
  selector: 'app-doc-list-export-dialog',
  templateUrl: './doc-list-export-dialog.component.html',
  styleUrls: ['./doc-list-export-dialog.component.css']
})
export class DocListExportDialogComponent implements OnInit {
  static isLoading: boolean;
  CLIENT_ID = '1bqptfh6hqy4tok'; // App key from Dropbox
  FILE_NAME = '/ScrollerDb.json'; // Or whatever you want the file to be named where the data is stored
  authUrl: string;
  dropboxToken: string;
  isAuthenticated: boolean;

  constructor(public dialogRef: MatDialogRef<DocListExportDialogComponent>,
              private docManagerService: DocManagerService,
              private cookieService: CookieService)
  {
    this.isAuthenticated = false;
    DocListExportDialogComponent.isLoading = false;
    const cookieName = 'dropbox-token';

    const dbx = new Dropbox({ clientId: this.CLIENT_ID });
    this.authUrl = dbx.getAuthenticationUrl(`${location.origin}/auth`);

    this.dropboxToken = Utils.getAccessTokenFromUrl();
    if (!this.dropboxToken){
      this.dropboxToken = this.cookieService.get(cookieName);
    }else{
      this.cookieService.set(cookieName, this.dropboxToken, 30, null, null, true, 'Lax');
    }
    this.isAuthenticated = this.dropboxToken ? true : false;
  }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onExportClick(): void{
    // TODO: check dropdown for target
    this.saveToDropbox();
  }

  saveToDropbox(): void {
    // export to JSON, clear database, and import from JSON
    this.docManagerService.getDocItemsFromDb().subscribe((docItems) => {
      console.log(`saving ${docItems.length} docs from db`);

      const dbx = new Dropbox({ accessToken: this.dropboxToken });
      dbx.filesUpload({contents: JSON.stringify(docItems),
        path: `${this.FILE_NAME}.${new Date().getTime()}`, mode: {'.tag': 'overwrite'}, autorename: false, mute: true })
        .then((response: any) => {
          alert('Saved successfully!');
          console.log('Saved data to Dropbox', response);
      }).catch((error: any) => {
        // If it errors because of a dropbox problem, reload the page so the user can re-connect to dropbox
        alert('Failed to save to dropbox');
        console.log(JSON.stringify(error));
        window.location.href = '/';
      });
    }, (err) => {
      alert('Failed to export local Db');
    });
  }

}
