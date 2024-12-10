import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrderProcessingService } from "src/app/services/order-processing.service";

@Component({
	selector: "app-order-processing-view",
	imports: [],
	templateUrl: "./order-processing-view.component.html",
	styleUrl: "./order-processing-view.component.scss",
})
export class OrderProcessingViewComponent {
	order: any = null;
	processingHistory: any[] = [];

	constructor(
		private route: ActivatedRoute,
		private orderProcessingService: OrderProcessingService
	) {}

	ngOnInit(): void {
		const orderId = this.route.snapshot.paramMap.get("id");
		if (orderId) {
			this.fetchOrderDetails(orderId);
		}
	}

	fetchOrderDetails(orderId: string): void {
		this.orderProcessingService.getOrderDetails(orderId).subscribe({
			next: (data) => {
				this.order = data.order;
				this.processingHistory = data.processingHistory;
			},
			error: (err) => {
				console.error("Error fetching order details:", err);
			},
		});
	}
}
