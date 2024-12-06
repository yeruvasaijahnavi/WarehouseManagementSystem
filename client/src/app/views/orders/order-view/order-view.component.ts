// order-view.component.ts
import { Component, OnInit, inject } from "@angular/core";
import { OrderService } from "../../../services/order.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-order-view",
	templateUrl: "./order-view.component.html",
	styleUrls: ["./order-view.component.scss"],
	imports: [CommonModule],
})
export class OrderViewComponent implements OnInit {
	orderId: string = "";
	orderDetails: any = {};
	orderService = inject(OrderService);
	router = inject(Router);
	activatedRoute = inject(ActivatedRoute);

	ngOnInit(): void {
		this.activatedRoute.paramMap.subscribe((params) => {
			this.orderId = params.get("id")!;
			this.loadOrderDetails();
			console.log("Order ID:", this.orderId);
		});
	}

	loadOrderDetails(): void {
		this.orderService.getOrderById(this.orderId).subscribe((order: any) => {
			this.orderDetails = order;
		});
	}
}
