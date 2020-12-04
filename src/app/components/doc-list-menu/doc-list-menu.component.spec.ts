import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocListMenuComponent } from './doc-list-menu.component';

describe('DocListMenuComponent', () => {
  let component: DocListMenuComponent;
  let fixture: ComponentFixture<DocListMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocListMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocListMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
