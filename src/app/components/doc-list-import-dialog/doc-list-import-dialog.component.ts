import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocManagerService } from 'src/app/services/doc-manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-doc-import-dialog',
  templateUrl: './doc-list-import-dialog.component.html',
  styleUrls: ['./doc-list-import-dialog.component.css']
})
export class DocListImportDialogComponent implements OnInit {
  file: any;

  constructor(public dialogRef: MatDialogRef<DocListImportDialogComponent>,
              private docManagerService: DocManagerService,
              private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  fileChanged(e): void {
    this.file = e.target.files[0];
  }

  showMsg(msg: string): void{
    this.snackBar.open(msg, null, {
      duration: 5000,
    });
  }

  onImportClick(): void {
    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      console.log('importing file...');
      this.docManagerService.importDb(JSON.parse(fileReader.result.toString()))
        .then(() => {
          console.log('imported file!');
          this.showMsg(`Imported data successfully!`);
          this.dialogRef.close();
        })
        .catch(reason => {
          this.showMsg(`Failed to import data | ${reason}`);
        });
    };
    fileReader.readAsText(this.file);
  }

}
