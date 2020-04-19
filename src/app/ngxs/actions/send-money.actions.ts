export class SendMoney {

  public static readonly type: string = '[Send Money Page] Send Money';

  public constructor(
    public amount: number,
    public recipientId: string,
    public message: string
  ) { }

}

export class ResetSendMoneyData {

  public static readonly type: string = '[Send Money Page] Reset';

}
