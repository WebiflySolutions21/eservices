import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftHistoryComponent } from './shift-history.component';

describe('ShiftHistoryComponent', () => {
  let component: ShiftHistoryComponent;
  let fixture: ComponentFixture<ShiftHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShiftHistoryComponent]
    });
    fixture = TestBed.createComponent(ShiftHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
