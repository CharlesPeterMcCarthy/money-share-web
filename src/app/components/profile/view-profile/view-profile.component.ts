import { Component, Input, OnInit } from '@angular/core';
import { MyUserProfile, UserProfile } from '@moneyshare/common-types';
import { DomSanitizer, SafeStyle, Title } from '@angular/platform-browser';
import { faPencilAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { UserAPIService } from '../../../services/api/user/user.service';
import { MoneyBottomSheetComponent } from '../../money-bottom-sheet/money-bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';
import HTMLInputEvent from '../../../interfaces/html-input-event';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngxs/store';
import { S3Service } from '../../../services/s3/s3.service';
import { Progress } from 'aws-sdk/lib/request';
import { UpdateAvatar } from '../../../ngxs/actions';

@Component({
  selector: 'view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.styl']
})
export class ViewProfileComponent implements OnInit {

  @Input() public profile: MyUserProfile | UserProfile;
  @Input() public isMyProfile: boolean = false;

  public editIcon: IconDefinition = faPencilAlt;
  public avatar: SafeStyle;

  public constructor(
    private _title: Title,
    private _userApi: UserAPIService,
    private _sanitization: DomSanitizer,
    private _bottomSheet: MatBottomSheet,
    private _spinner: NgxSpinnerService,
    private _store: Store,
    private _s3Service: S3Service
  ) { }

  public ngOnInit(): void {
    this.setAvatar(this.profile.avatar);
    this._title.setTitle(`${this.isMyProfile ? 'My Profile' : this.profile.firstName} | MoneyShare`);

    this.imageUploadListener();
    this.imageUploadProgressListener();
  }

  private setAvatar = (avatar: string): SafeStyle => this.avatar =
    this._sanitization.bypassSecurityTrustStyle(`url(${ avatar || './assets/images/noavatar.jpg' })`);

  public myProfile = (): MyUserProfile => this.profile as MyUserProfile;

  public moneyOptions = (): void => {
    if (this.isMyProfile) this._bottomSheet.open(MoneyBottomSheetComponent);
  }

  public imageSelected = async (e: Event): Promise<void> => {
    const event = e as HTMLInputEvent; // For intellisense
    const imageFile: File = event.target.files && event.target.files.length && event.target.files[0];
    console.log(imageFile);
    if (!imageFile) return;
    await this.uploadImage(imageFile);
  }

  private uploadImage = async (image: File): Promise<void> => {
    await this._spinner.show('spinner');
    this._s3Service.upload(image);
  }

  private imageUploadListener = (): void => {
    this._s3Service.uploadListener.subscribe(async (imageURL: string) => {
      console.log(imageURL);
      if (!imageURL) return;

      this._store.dispatch(new UpdateAvatar(imageURL)).subscribe(() => {
        this._spinner.hide('spinner');
        this.setAvatar(imageURL);
        this._s3Service.reset()
      });
    });
  }

  private imageUploadProgressListener = (): Subscription => this._s3Service.progressListener.subscribe((res: Progress) => console.log(res));

}
