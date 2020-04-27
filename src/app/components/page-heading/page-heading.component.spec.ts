import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeadingComponent } from './page-heading.component';

describe('PageHeadingComponent', () => {
  let component: PageHeadingComponent;
  let fixture: ComponentFixture<PageHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageHeadingComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeadingComponent);
    component = fixture.componentInstance;

    component.title = ''; // Initialise empty title

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should capitalise the first letter of the page title', () => {
    component.title = 'dashboard';

    expect(component.Title).toBe('Dashboard');
  });

  it('should make the text after the first character lowercase for the page title', () => {
    component.title = 'DASHBOARD';

    expect(component.Title).toBe('Dashboard');
  });
});
