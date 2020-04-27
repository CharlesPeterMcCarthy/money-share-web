import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemComponent } from './user-item.component';

describe('UserItemComponent', () => {
  let component: UserItemComponent;
  let fixture: ComponentFixture<UserItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserItemComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserItemComponent);
    component = fixture.componentInstance;

    component.user = {
      avatar: '',
      firstName: 'John',
      lastName: 'Doe'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show default avatar if user avatar is missing', () => {
    component.user.avatar = '';
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('img#avatar').src).toContain('assets/images/noavatar.jpg');
  });

  it('should render the user full name with a space between', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('div.name').textContent.trim()).toBe(`${component.user.firstName} ${component.user.lastName}`);
  });
});
