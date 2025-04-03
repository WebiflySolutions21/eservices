import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawWriteModalComponent } from './draw-write-modal.component';

describe('DrawWriteModalComponent', () => {
  let component: DrawWriteModalComponent;
  let fixture: ComponentFixture<DrawWriteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawWriteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawWriteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
