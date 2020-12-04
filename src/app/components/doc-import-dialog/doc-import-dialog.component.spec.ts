import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocImportDialogComponent } from './doc-import-dialog.component';

describe('DocImportDialogComponent', () => {
  let component: DocImportDialogComponent;
  let fixture: ComponentFixture<DocImportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocImportDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocImportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
