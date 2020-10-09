import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftListNavbarComponent } from './gift-list-navbar.component';

describe('GiftListNavbarComponent', () => {
  let component: GiftListNavbarComponent;
  let fixture: ComponentFixture<GiftListNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftListNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftListNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
