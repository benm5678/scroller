import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as NoSleep from 'nosleep.js';
import { DocItem } from 'src/app/models/doc-item';
import { DocManagerService } from 'src/app/services/doc-manager.service';

import { DocListComponent } from './../doc-list/doc-list.component';

@Component({
  selector: 'app-current-doc',
  templateUrl: './current-doc.component.html',
  styleUrls: ['./current-doc.component.css']
})
export class CurrentDocComponent implements OnInit {
  @ViewChild('scrolledDocContainer') scrolledContentContainer: ElementRef;
  @ViewChild('newTitle') newTitle: ElementRef;
  @ViewChild('newTextContent') newTextContent: ElementRef;
  @Input() public docListComponent: DocListComponent;
  docItem: DocItem = null;
  isActive = false;
  isEditing = false;
  speed = 0;
  scrollThread;
  noSleep = new NoSleep.default();
  noSleepStatus = '';
  lastScrollStopTime: number = null;
  debugInfo = "";

  constructor(private docManagerService: DocManagerService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // Subscribe to import even to reload docs
    this.docListComponent.docSelected$.subscribe(docItem => {
      this.loadDocItem(docItem);
    });


    // Disable scroll when doc hidden (so noSleep works when user returns)
    document.addEventListener(
      'visibilitychange'
      , () => {
        if (document.hidden) {
          console.log('document was hidden');
          this.toggleAutoScroll(false);
        }else{
          console.log('document became visible');
        }
      }
    );
  }

  showMsg(msg: string): void{
    this.snackBar.open(msg, null, {
      duration: 5000,
    });
  }

  formatLabel(value: number): string {
    return value.toString();
  }

  onEditClick(): void {
    this.isEditing = true;
    // Update edit fields
    this.newTitle.nativeElement.value = this.docItem.title;
    this.newTextContent.nativeElement.value = this.docItem.textContent;
  }

  onUndoEditClick(): void {
    this.isEditing = false;
    this.showMsg('Cancelled edit!');
  }

  onDeleteClick(): void {
    console.log(`delete clicked | docId: ${this.docItem.id}`);
    if (confirm(`Proceed to delete '${this.docItem.title}' ?`)){
      this.docManagerService.deleteDocItem(this.docItem.id)
      .then((response) => {
        console.log(`deleted doc | id: ${this.docItem.id}`);
        this.docItem = null;
        this.showMsg(`Deleted document "${this.docItem.title}"!`);
      }).catch((err) => {
        console.log(`Failed to delete doc | id: ${this.docItem.id}`);
        this.showMsg(`Failed to delete document "${this.docItem.title}"!`);
      });
    }
  }

  onSaveClicked(): void{
    console.log(`onSaveClicked | doc id: ${this.docItem.id}`);
    this.docItem.title = this.newTitle.nativeElement.value;
    this.docItem.textContent = this.newTextContent.nativeElement.value;
    this.docItem.scrollSpeed = this.speed;
    this.docManagerService.saveDocItem(this.docItem).subscribe((docItems) => {
      console.log(`savedDoc | db item count: ${docItems.length}`);
      this.isEditing = false;
      this.showMsg(`Saved document "${this.docItem.title}"!`);
    });
  }

  loadDocItem(docItem: DocItem): void {
    this.docItem = docItem;
    console.log(`displaying doc id ${this.docItem.id}`);
    this.isEditing = false;
    this.speed = this.docItem.scrollSpeed;
    this.onSpeedChanged();
    // Scroll to top
    this.scrolledContentContainer.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSpeedChanged(): void {
    this.stopAutoScroll();
    this.startAutoScroll();
  }

  toggleAutoScroll(enable: boolean): void {
    if (enable) {
      this.enableNoSleep();
      this.startAutoScroll();
      this.isActive = true;
    } else {
      this.disableNoSleep();
      this.stopAutoScroll();
      this.isActive = false;
    }
  }

  onAutoScrollClicked(): void {
    if (this.isActive) {
      this.toggleAutoScroll(true);
    } else {
      this.toggleAutoScroll(false);
    }
  }

  startAutoScroll(): void {
    // reset last scroll stop time
    this.lastScrollStopTime = null;

    // start auto scroll thread
    const scrollHeight = this.scrolledContentContainer.nativeElement.scrollHeight;
    const clientHeight = this.scrolledContentContainer.nativeElement.clientHeight;
    const maxScrollTop = scrollHeight - clientHeight;
    const msToPauseBetweenScrolls = ((this.speed * 1000) / maxScrollTop);
    this.scrollThread = setInterval(() => {
      if (this.isActive) {
        const newScrollTop = this.scrolledContentContainer.nativeElement.scrollTop + 1;

        if (newScrollTop < (maxScrollTop)) {
          this.debugInfo = `newScrollTop: ${newScrollTop} | maxScrollTop: ${maxScrollTop} | speed: ${this.speed} | msToPauseBetweenScrolls: ${msToPauseBetweenScrolls}`;
          // didn't reach end, scroll it
          this.lastScrollStopTime = null; // reset the last stop
          this.scrolledContentContainer.nativeElement.scrollTo({ top: newScrollTop, behavior: 'smooth' });
        } else {
          // set scroll stop time
          if (this.lastScrollStopTime === null) {
            this.lastScrollStopTime = new Date().getTime();
          } else {
            // already set, let's check if stopped too long, disable auto scroll
            const maxScrollStoppedInMs = 1000 * 60 * 3;
            if ((new Date().getTime() - this.lastScrollStopTime) > maxScrollStoppedInMs) {
              this.toggleAutoScroll(false);
            }
          }
        }
      }
    }, msToPauseBetweenScrolls);
  }

  stopAutoScroll(): void {
    clearInterval(this.scrollThread);
  }

  enableNoSleep(): void {
    this.noSleep.enable();
    this.noSleepStatus = 'Screen Lock Disabled!';
    console.log('enabled screen wake lock');
  }

  disableNoSleep(): void {
    this.noSleep.disable();
    this.noSleepStatus = '';
    console.log('disabled screen wake lock');
  }

}
