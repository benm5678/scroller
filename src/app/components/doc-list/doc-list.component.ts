import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DocItem } from 'src/app/models/doc-item';
import { DocManagerService } from 'src/app/services/doc-manager.service';

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.css']
})
export class DocListComponent implements OnInit {
  @Output() docItemSelected: EventEmitter<DocItem> = new EventEmitter();
  docItems: DocItem[];

  constructor(private docManagerService: DocManagerService) { }

  ngOnInit(): void {
    this.loadDocsFromDb();
    // Subscribe to import even to reload docs
    this.docManagerService.docsImported$.subscribe(docItems => {
      this.loadDocsFromDb();
    });
  }

  loadDocsFromDb(): void{
    this.docManagerService.getDocItemsFromDb().subscribe((docItems) => {
      console.log(`loaded ${docItems.length} docs from db`);
      this.docItems = docItems;
    });
  }

  onDeleteClicked(e, docItem: DocItem): void{
    e.stopPropagation();
    console.log(`onDeleteClicked | doc id: ${docItem.id}`);
    if (confirm(`Proceed to delete '${docItem.title}' ?`)){
      this.docManagerService.deleteDocItem(docItem.id)
      .subscribe((allPeople) => {
        console.log(`deleted doc | id: ${docItem.id}`);
        this.loadDocsFromDb();
      });
    }
  }

  onAddNewClicked(): void{
    console.log(`onAddNewClicked`);
    this.docManagerService.addDocItemToDb().subscribe((key) => {
      console.log('added new | doc id: ', key);
      this.loadDocsFromDb();
    });
  }

  onRowClicked(docItem: DocItem): void{
    console.log(`onRowClicked | doc id: ${docItem.id}`);
    this.docItemSelected.emit(docItem);
  }

  docItemsTableImported(): void{
    this.loadDocsFromDb();
  }
}
