import { Component } from "@angular/core";
import { OrderProcessingService } from "src/app/services/order-processing.service";
import { CommonModule } from "@angular/common";
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
}
