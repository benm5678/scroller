import { Component, OnInit } from '@angular/core';
import { DocManagerService } from 'src/app/services/doc-manager.service';

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.css']
})
export class DocListComponent implements OnInit {

  constructor(private docItemService: DocManagerService) { }

  ngOnInit(): void {
  }

}
