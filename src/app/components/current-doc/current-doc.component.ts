import { Component, OnInit, ElementRef, ViewChild, Optional } from '@angular/core';
import * as NoSleep from 'nosleep.js';
import { DocItem } from 'src/app/models/doc-item';

@Component({
  selector: 'app-current-doc',
  templateUrl: './current-doc.component.html',
  styleUrls: ['./current-doc.component.css']
})
export class CurrentDocComponent implements OnInit {
  @ViewChild('scrolledDocContainer') scrolledContentContainer: ElementRef;
  isActive = false;
  speed = 0;
  scrollThread;
  noSleep = new NoSleep.default();
  noSleepStatus = '';
  lastScrollStopTime: number = null;

  constructor(@Optional() public docItem: DocItem) { }

  ngOnInit(): void {
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  loadDocItem(): void{
    //this.enableEditing(false);
    if (this.docItem == null){
      //this.scrolledContentHeader.nativeElement.classList.add('no-doc-loaded');
      console.log('no doc loaded');
    }else{
      console.log(`displaying doc id ${this.docItem.id}`);
      //this.scrolledContentHeader.nativeElement.classList.remove('no-doc-loaded');
      //this.newTitle.nativeElement.value = this.docItem.title;
      //this.newTextContent.nativeElement.value = this.docItem.textContent;
      this.speed = this.docItem.scrollSpeed;
      this.onSpeedChanged(null);
      this.scrolledContentContainer.nativeElement.scrollTo({top: 0, behavior: 'smooth'});
    }
  }

  onSpeedChanged(e): void{
    this.stopAutoScroll();
    this.startAutoScroll();
  }

  toggleAutoScroll(enable: boolean): void{
    if (enable){
      this.enableNoSleep();
      this.startAutoScroll();
      this.isActive = true;
    }else{
      this.disableNoSleep();
      this.stopAutoScroll();
      this.isActive = false;
    }
  }

  onAutoScrollClicked(): void{
    if (this.isActive){
      this.toggleAutoScroll(true);
    }else{
      this.toggleAutoScroll(false);
    }
  }

  startAutoScroll(): void {
    // reset last scroll stop time
    this.lastScrollStopTime = null;

    // start auto scroll thread
    this.scrollThread = setInterval(() => {
      if (this.isActive) {
        const newScrollTop = this.scrolledContentContainer.nativeElement.scrollTop + 1;
        if (newScrollTop < (this.scrolledContentContainer.nativeElement.scrollHeight - this.scrolledContentContainer.nativeElement.clientHeight)) {
          // didn't reach end, scroll it
          this.scrolledContentContainer.nativeElement.scrollTo({top: newScrollTop, behavior: 'smooth'});
        }else{
          // set scroll stop time
          if (this.lastScrollStopTime == null)
          {
            this.lastScrollStopTime = new Date().getTime();
          }else{
            // already set, let's check if stopped too long, disable auto scroll
            const maxScrollStoppedInMs = 1000 * 60 * 3;
            if ((new Date().getTime() - this.lastScrollStopTime) > maxScrollStoppedInMs){
              this.toggleAutoScroll(false);
            }
          }
        }
      }
    }, (1000 - (this.speed * 10) ));
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
