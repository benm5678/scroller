import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DocItem } from 'src/app/models/doc-item';
import { DocManagerService } from 'src/app/services/doc-manager.service';

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.css']
})
export class DocListComponent implements OnInit {
  @ViewChild('docList') docList: ElementRef;
  docItems: DocItem[];
  private docSelectedSource = new Subject<DocItem>();
  docSelected$ = this.docSelectedSource.asObservable();

  constructor(private docManagerService: DocManagerService) { }

  ngOnInit(): void {
    this.loadDocsFromDb();
    // Subscribe to import even to reload docs
    this.docManagerService.docsChanged$.subscribe(docItems => {
      this.loadDocsFromDb();
    });
  }

  loadDocsFromDb(): void {
    this.docManagerService.getDocItemsFromDb().subscribe((docItems) => {
      console.log(`loaded ${docItems.length} docs from db`);
      this.docItems = docItems;
    });
  }

  onAddNewClicked(): void {
    console.log(`onAddNewClicked`);
    this.docManagerService.addDocItemToDb()
      .then((response: any) => {
        console.log('added new | doc id: ', response);
      }).catch((error: any) => {
        console.log('faied to add new doc');
      });
  }

  onRowClicked(e): void {
    const docItem: DocItem = e.option.value;
    console.log(`onRowClicked | doc id: ${docItem.id}`);
    this.docSelectedSource.next(docItem);
  }

  docItemsTableImported(): void {
    this.loadDocsFromDb();
  }
}
