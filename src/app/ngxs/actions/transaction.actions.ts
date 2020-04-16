export class GetAllTransactions {

  public static readonly type: string = '[Transaction Page] Get ALl Transactions';

  public constructor(
    public isFirstLoad: boolean
  ) { }

}
