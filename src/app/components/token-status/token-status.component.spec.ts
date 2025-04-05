import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenStatusComponent } from './token-status.component';

describe('TokenStatusComponent', () => {
  let component: TokenStatusComponent;
  let fixture: ComponentFixture<TokenStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
