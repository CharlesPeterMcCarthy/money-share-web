export class CreatePaymentIntent {

  public static readonly type: string = '[Deposit Page] Create Payment Intent';

  public constructor(
    public amount: number
  ) { }

}

export class UpdateBalance {

  public static readonly type: string = '[Deposit Page] Update Balance';

}
