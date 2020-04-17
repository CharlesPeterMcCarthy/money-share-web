export class WithdrawMoney {

  public static readonly type: string = '[Withdraw Page] Withdraw Money';

  public constructor(
    public amount: number
  ) { }

}
