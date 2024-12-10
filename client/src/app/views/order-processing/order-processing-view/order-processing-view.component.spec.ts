import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProcessingViewComponent } from './order-processing-view.component';

describe('OrderProcessingViewComponent', () => {
  let component: OrderProcessingViewComponent;
  let fixture: ComponentFixture<OrderProcessingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderProcessingViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderProcessingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
