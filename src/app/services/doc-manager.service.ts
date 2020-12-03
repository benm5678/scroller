import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { DocItem } from '../models/doc-item';

const dbTableName = 'docs';
@Injectable({
  providedIn: 'root'
})
export class DocManagerService {

  constructor(private dbService: NgxIndexedDBService) { }

  async importDb(docItems: DocItem[]): Promise<any>{
    return new Promise((resolve, reject) => {
      this.dbService.clear(dbTableName).subscribe((isSuccess) => {
        if (isSuccess){
          docItems.forEach(async doc => {
            await this.dbService.add(dbTableName, doc);
          });
          resolve(true);
        }
      });
    });
  }

  getDocItemsFromDb(): Observable<DocItem[]>{
    return this.dbService.getAll(dbTableName);
  }

  addDocItemToDb(): Observable<number>{
    return this.dbService
    .add(dbTableName, {
      title: `NewDoc${new Date().getTime()}`,
      scrollSpeed: 60,
      textContent: `ReplaceWithYourContent`,
    });
  }

  deleteDocItem(id: number): Observable<any[]>{
    return this.dbService.delete(dbTableName, id);
  }

  saveDocItem(doc: DocItem): Observable<any[]>{
    return this.dbService.update(dbTableName, {
      id: doc.id,
      scrollSpeed: doc.scrollSpeed,
      textContent: doc.textContent,
      title: doc.title,
    });
  }
}
