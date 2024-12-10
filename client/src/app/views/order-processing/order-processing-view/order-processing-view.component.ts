import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProgressComponent, ProgressStackedComponent } from "@coreui/angular";
import { OrderProcessingService } from "src/app/services/order-processing.service";

@Component({
	selector: "app-order-processing-view",
	imports: [CommonModule, ProgressComponent, ProgressStackedComponent],
	templateUrl: "./order-processing-view.component.html",
	styleUrl: "./order-processing-view.component.scss",
})
export class OrderProcessingViewComponent {
	order: any = null;
	auditLogs: any[] = [];
	statuses: string[] = [
		"pending",
		"assigned",
		"packed",
		"shipped",
		"delivered",
	];
	progressValue = 0;
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
				this.auditLogs = data.auditLogs;
				console.log("Order details:", data);
				this.calculateProgressValue();
			},
			error: (err) => {
				console.error("Error fetching order details:", err);
			},
		});
	}

	calculateProgressValue(): number {
		this.progressValue =
			(this.statuses.indexOf(this.order.status) + 1) *
			(100 / this.statuses.length);

		return this.progressValue;
	}
}
