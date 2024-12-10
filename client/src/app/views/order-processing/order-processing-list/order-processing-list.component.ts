import { Component, inject } from "@angular/core";
import { OrderProcessingService } from "src/app/services/order-processing.service";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
@Component({
	selector: "app-order-processing-list",
	imports: [CommonModule],
	templateUrl: "./order-processing-list.component.html",
	styleUrl: "./order-processing-list.component.scss",
})
export class OrderProcessingListComponent {
	orderProcessings: any[] = [];

	constructor(private orderProcessingService: OrderProcessingService) {}

	ngOnInit(): void {
		this.getAllOrderProcessing();
	}
	router = inject(Router);

	// Fetch all order processing details from the service
	getAllOrderProcessing(): void {
		this.orderProcessingService.getAllOrderProcessing().subscribe({
			next: (data) => {
				this.orderProcessings = data;
				console.log("Order processing details:", data);
			},
			error: (error) => {
				console.error(
					"Error fetching order processing details:",
					error
				);
			},
		});
	}
	viewOrder(orderId: string): void {
		this.router.navigate(["view", orderId]); // Correct usage
	}
}
