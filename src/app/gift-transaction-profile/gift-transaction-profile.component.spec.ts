import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftTransactionProfileComponent } from './gift-transaction-profile.component';

describe('GiftTransactionProfileComponent', () => {
  let component: GiftTransactionProfileComponent;
  let fixture: ComponentFixture<GiftTransactionProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftTransactionProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftTransactionProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
