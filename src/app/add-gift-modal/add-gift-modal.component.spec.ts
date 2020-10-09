import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGiftModalComponent } from './add-gift-modal.component';

describe('AddGiftModalComponent', () => {
  let component: AddGiftModalComponent;
  let fixture: ComponentFixture<AddGiftModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGiftModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGiftModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
