import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocListExportDialogComponent } from './doc-list-export-dialog.component';

describe('DocListExportDialogComponent', () => {
  let component: DocListExportDialogComponent;
  let fixture: ComponentFixture<DocListExportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocListExportDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocListExportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
