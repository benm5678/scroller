import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocManagerService } from 'src/app/services/doc-manager.service';

@Component({
  selector: 'app-doc-import-dialog',
  templateUrl: './doc-import-dialog.component.html',
  styleUrls: ['./doc-import-dialog.component.css']
})
export class DocImportDialogComponent implements OnInit {
  @Output() docItemsTableImported: EventEmitter<any> = new EventEmitter();
  file: any;

  constructor(public dialogRef: MatDialogRef<DocImportDialogComponent>,
              private docItemService: DocManagerService) {

  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  fileChanged(e): void {
    this.file = e.target.files[0];
  }

  onImportClick(): void {
    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      console.log('importing file...');
      this.docItemService.importDb(JSON.parse(fileReader.result.toString()))
        .then(() => {
          console.log('imported file!');
          this.docItemsTableImported.emit();
        });
    };
    fileReader.readAsText(this.file);
  }

}
