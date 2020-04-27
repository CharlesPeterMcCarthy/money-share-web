import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionComponent } from './transaction.component';
import { TimeSincePipe } from '../../pipes/time-since/time-since.pipe';
import { TransactionSignPipe } from '../../pipes/transaction-sign/transaction-sign.pipe';
import { MoneyPipe } from '../../pipes/money/money.pipe';

describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TransactionComponent,
        TimeSincePipe,
        TransactionSignPipe,
        MoneyPipe
      ],
      providers: [
        TimeSincePipe,
        TransactionSignPipe,
        MoneyPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;

    component.transaction = { // Setup fake transaction
      pk: '',
      sk: '',
      entity: 'transaction',
      text: 'Test',
      amount: 10,
      newBalance: 50,
      transactionId: '123ABC',
      type: 'DEPOSIT',
      accessKey: {
        pk: '',
        sk: ''
      },
      times: {
        createdAt: new Date().toISOString()
      }
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return "positive" for transaction type DEPOSIT', () => {
    expect(component.transactionDirection()).toBe('positive');
  });

  it('should return "positive" for transaction type RECEIVE', () => {
    component.transaction.type = 'RECEIVE';

    expect(component.transactionDirection()).toBe('positive');
  });

  it('should return "negative" for transaction type WITHDRAW', () => {
    component.transaction.type = 'WITHDRAW';

    expect(component.transactionDirection()).toBe('negative');
  });

  it('should return "negative" for transaction type TRANSFER', () => {
    component.transaction.type = 'TRANSFER';

    expect(component.transactionDirection()).toBe('negative');
  });
});
