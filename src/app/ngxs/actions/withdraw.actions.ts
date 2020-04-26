export class WithdrawMoney {

  public static readonly type: string = '[Withdraw Page] Withdraw Money';

  public constructor(
    public amount: number
  ) { }

}

export class GetWithdrawals {

  public static readonly type: string = '[Withdraw Page] Get Withdrawals';

  public constructor(
    public isFirstLoad: boolean
  ) { }

}

export class ResetWithdrawForm {

  public static readonly type: string = '[Withdraw Page] Reset Withdraw Form';

}
