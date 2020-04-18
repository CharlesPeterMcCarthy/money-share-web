import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyBottomSheetComponent } from './money-bottom-sheet.component';

describe('MoneyBottomSheetComponent', () => {
  let component: MoneyBottomSheetComponent;
  let fixture: ComponentFixture<MoneyBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
