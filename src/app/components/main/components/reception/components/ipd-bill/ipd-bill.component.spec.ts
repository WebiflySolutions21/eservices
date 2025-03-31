import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpdBillComponent } from './ipd-bill.component';

describe('IpdBillComponent', () => {
  let component: IpdBillComponent;
  let fixture: ComponentFixture<IpdBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpdBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpdBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
