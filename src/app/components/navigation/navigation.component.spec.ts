import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { NavLink } from '../../interfaces/nav-link';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass if all nav links begin with a forward slash', () => {
    expect(component.navLinks.every((navLink: NavLink) => navLink.url.charAt(0) === '/')).toBeTruthy();
  });

  it('should pass if all nav links texts begin with an uppercase letter', () => {
    expect(component.navLinks.every((navLink: NavLink) => navLink.text.charAt(0) === navLink.text.charAt(0).toUpperCase())).toBeTruthy();
  });
});
