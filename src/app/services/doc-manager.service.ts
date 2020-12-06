import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, Subject } from 'rxjs';
import { DocItem } from '../models/doc-item';

const dbTableName = 'docs';
@Injectable({
  providedIn: 'root'
})
export class DocManagerService {
  private docDataChangedSource = new Subject<null>();
  docsChanged$ = this.docDataChangedSource.asObservable();

  constructor(private dbService: NgxIndexedDBService) { }

  async importDb(docItems: DocItem[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dbService.clear(dbTableName).subscribe((isSuccess) => {
        if (isSuccess) {
          docItems.forEach(async doc => {
            await this.dbService.add(dbTableName, doc);
          });
          this.docDataChangedSource.next();
          resolve(true);
        }
      });
    });
  }

  getDocItemsFromDb(): Observable<DocItem[]> {
    return this.dbService.getAll(dbTableName);
  }

  async addDocItemToDb(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dbService
        .add(dbTableName, {
          title: `NewDoc${new Date().getTime()}`,
          scrollSpeed: 60,
          textContent: `ReplaceWithYourContent`,
        }).subscribe((count) => {
          this.docDataChangedSource.next();
          resolve(true);
        });
    });
  }

  async deleteDocItem(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dbService.delete(dbTableName, id).subscribe((items) => {
        this.docDataChangedSource.next();
        resolve(true);
      });
    });
  }

  saveDocItem(doc: DocItem): Observable<any[]> {
    return this.dbService.update(dbTableName, {
      id: doc.id,
      scrollSpeed: doc.scrollSpeed,
      textContent: doc.textContent,
      title: doc.title,
    });
  }
}
