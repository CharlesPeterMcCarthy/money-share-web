import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositCardComponent } from './deposit.component';

describe('DepositComponent', () => {
  let component: DepositCardComponent;
  let fixture: ComponentFixture<DepositCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
