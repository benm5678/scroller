import { CurrentDocComponent } from './components/current-doc/current-doc.component';
import { Component, ViewChild } from '@angular/core';
import { version } from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(CurrentDocComponent) currentDoc: CurrentDocComponent;
  title = 'Scroller';
  version: string = version;

  docItemSelected(e): void{
    console.log(e);
    this.currentDoc.docItem = e;
    this.currentDoc.loadDocItem();
  }
}
