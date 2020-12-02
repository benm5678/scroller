import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDocComponent } from './current-doc.component';

describe('CurrentDocComponent', () => {
  let component: CurrentDocComponent;
  let fixture: ComponentFixture<CurrentDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
