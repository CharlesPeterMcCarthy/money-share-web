import { MyUserProfile, UserProfile } from '@moneyshare/common-types';

export interface GenericResponse {
  success: boolean;
}

export interface OtherProfileResponse extends GenericResponse {
  profile: UserProfile;
}

export interface MyProfileResponse extends GenericResponse {
  profile: MyUserProfile;
}
