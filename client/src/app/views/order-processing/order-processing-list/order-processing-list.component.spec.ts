import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProcessingListComponent } from './order-processing-list.component';

describe('OrderProcessingListComponent', () => {
  let component: OrderProcessingListComponent;
  let fixture: ComponentFixture<OrderProcessingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderProcessingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderProcessingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
