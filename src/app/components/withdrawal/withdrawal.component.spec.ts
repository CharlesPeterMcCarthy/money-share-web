import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalCardComponent } from './withdrawal.component';

describe('WithdrawalComponent', () => {
  let component: WithdrawalCardComponent;
  let fixture: ComponentFixture<WithdrawalCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
