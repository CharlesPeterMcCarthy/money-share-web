import { Component, Inject, Input, OnInit } from '@angular/core';
import { UserProfile } from '@moneyshare/common-types';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../../services/auth/auth.service';
import { UserAPIService } from '../../../services/api/user/user.service';
import { NOTYF } from '../../../utils/notyf.token';
import { Notyf } from 'notyf';
import { EditProfile } from '../../../ngxs/actions';
import { Store } from '@ngxs/store';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.styl']
})
export class EditProfileComponent implements OnInit {

  @Input() public profile: UserProfile;
  public form: FormGroup;

  public saveIcon: IconDefinition = faSave;

  public constructor(
    private _title: Title,
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _userApi: UserAPIService,
    private _spinner: NgxSpinnerService,
    private _store: Store,
    @Inject(NOTYF) private _notyf: Notyf
  ) {
    this._title.setTitle('Edit Profile | InstaKilo');
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(this.profile.firstName, Validators.required),
      lastName: new FormControl(this.profile.lastName, Validators.required)
    });
  }

  public get firstName(): AbstractControl { return this.form.get('firstName'); }
  public get lastName(): AbstractControl { return this.form.get('lastName'); }

  public submit = async (): Promise<void> => {
    if (!this.form.valid) return;
    await this._spinner.show('spinner');

    this._store.dispatch(new EditProfile(this.firstName.value, this.lastName.value)).subscribe((data) => {
      console.log(data);
      this._spinner.hide('spinner');
    });
  }

}
