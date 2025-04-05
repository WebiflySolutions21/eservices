import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantSignComponent } from './consultant-sign.component';

describe('ConsultantSignComponent', () => {
  let component: ConsultantSignComponent;
  let fixture: ComponentFixture<ConsultantSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultantSignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultantSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
