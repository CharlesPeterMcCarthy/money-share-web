export class GetMyProfile {

  public static readonly type: string = '[Profile Page] Get My Profile';

}

export class GetOtherProfile {

  public static readonly type: string = '[Profile Page] Get Other Profile';

  public constructor(
    public userId: string
  ) { }

}

export class EditProfile {

  public static readonly type: string = '[Profile Page] Edit Profile';

  public constructor(
    public firstName: string,
    public lastName: string
  ) { }

}

export class UpdateAvatar {

  public static readonly type: string = '[Profile Page] Update Avatar';

  public constructor(
    public avatar: string
  ) { }

}
