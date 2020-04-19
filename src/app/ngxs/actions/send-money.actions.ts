export class SendMoney {

  public static readonly type: string = '[Send Money Page] Send Money';

  public constructor(
    public amount: number
  ) { }

}

export class RecipientSearch {

  public static readonly type: string = '[Send Money Page] Recipient Search';

  public constructor(
    public searchText: string
  ) { }

}
