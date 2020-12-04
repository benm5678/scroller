import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocListImportDialogComponent } from './doc-list-import-dialog.component';

describe('DocListImportDialogComponent', () => {
  let component: DocListImportDialogComponent;
  let fixture: ComponentFixture<DocListImportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocListImportDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocListImportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
