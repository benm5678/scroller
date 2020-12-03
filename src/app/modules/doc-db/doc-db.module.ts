import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

const dbConfig: DBConfig  = {
  name: 'ScrollerDb',
  version: 1,
  objectStoresMeta: [{
    store: 'docs',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'title', keypath: 'title', options: { unique: true } },
      { name: 'textContent', keypath: 'textContent', options: { unique: false } },
      { name: 'scrollSpeed', keypath: 'scrollSpeed', options: { unique: false } }
    ]
  }]
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ]
})
export class DocDbModule { }
