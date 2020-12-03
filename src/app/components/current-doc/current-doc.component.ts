import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-doc',
  templateUrl: './current-doc.component.html',
  styleUrls: ['./current-doc.component.css']
})
export class CurrentDocComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

}
