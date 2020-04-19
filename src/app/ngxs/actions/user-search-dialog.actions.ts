import { User } from '@moneyshare/common-types';

export class UserSearch {

  public static readonly type: string = '[User Search Dialog] User Search';

  public constructor(
    public searchText: string
  ) { }

}

export class SelectUser {

  public static readonly type: string = '[User Search Dialog] Select User';

  public constructor(
    public user: Partial<User>
  ) { }

}

export class ResetUser {

  public static readonly type: string = '[User Search Dialog] Reset User';

}

export class ClearData {

  public static readonly type: string = '[User Search Dialog] Clear Data';

}

export class ClearResults {

  public static readonly type: string = '[User Search Dialog] Clear Results';

}
