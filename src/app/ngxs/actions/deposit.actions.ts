export class BeginDeposit {

  public static readonly type: string = '[Deposit Page] Begin Deposit';

  public constructor(
    public amount: number
  ) { }

}

export class CompleteDeposit {

  public static readonly type: string = '[Deposit Page] Complete Deposit';

}

export class GetDeposits {

  public static readonly type: string = '[Deposit Page] Get Deposits';

  public constructor(
    public isFirstLoad: boolean
  ) { }

}
