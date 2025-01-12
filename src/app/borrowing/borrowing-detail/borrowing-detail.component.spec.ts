import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingDetailComponent } from './borrowing-detail.component';

describe('BorrowingDetailComponent', () => {
  let component: BorrowingDetailComponent;
  let fixture: ComponentFixture<BorrowingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BorrowingDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
