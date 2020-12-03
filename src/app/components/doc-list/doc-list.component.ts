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

  constructor(private docItemService: DocManagerService) { }

  ngOnInit(): void {
    this.loadDocsFromDb();
  }

  loadDocsFromDb(): void{
    this.docItemService.getDocItemsFromDb().subscribe((docItems) => {
      console.log(`loaded ${docItems.length} docs from db`);
      this.docItems = docItems;
    });
  }

  onDeleteClicked(e, docItem: DocItem): void{
    e.stopPropagation();
    console.log(`onDeleteClicked | doc id: ${docItem.id}`);
    if (confirm(`Proceed to delete '${docItem.title}' ?`)){
      this.docItemService.deleteDocItem(docItem.id)
      .subscribe((allPeople) => {
        console.log(`deleted doc | id: ${docItem.id}`);
        this.loadDocsFromDb();
      });
    }
  }

  onAddNewClicked(): void{
    console.log(`onAddNewClicked`);
    this.docItemService.addDocItemToDb().subscribe((key) => {
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
