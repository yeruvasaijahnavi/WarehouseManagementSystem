import { Component, inject } from "@angular/core";
import { OrderProcessingService } from "src/app/services/order-processing.service";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service"; // Import AuthService
import { assign } from "lodash-es";

@Component({
	selector: "app-order-processing-list",
	imports: [CommonModule],
	templateUrl: "./order-processing-list.component.html",
	styleUrls: ["./order-processing-list.component.scss"],
})
export class OrderProcessingListComponent {
	orderProcessings: any[] = [];
	filteredOrderProcessings: any[] = [];

	constructor(
		private orderProcessingService: OrderProcessingService,
		private authService: AuthService // Inject AuthService
	) {}

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
				this.filterOrderProcessings(); // Filter after fetching the data
			},
			error: (error) => {
				console.error(
					"Error fetching order processing details:",
					error
				);
			},
		});
	}

	// Function to filter order processings based on user role
	filterOrderProcessings(): void {
		const currentUser = this.authService.getUser(); // Get the current user info
		// console.log(this.orderProcessings, currentUser);

		if (currentUser.role === "staff") {
			// If the user is staff, only show order processings assigned to them
			this.filteredOrderProcessings = this.orderProcessings.filter(
				(orderProcessing) => {
					// Ensure assignedStaff exists and matches the current user's email
					// console.log(orderProcessing.orderId.assignedStaff);
					return (
						orderProcessing.orderId.assignedStaff &&
						orderProcessing.orderId.assignedStaff.email ===
							currentUser.email
					);
				}
			);
			console.log(
				"Filtered order processing",
				this.filteredOrderProcessings
			);
		} else {
			// If the user is admin or other roles, show all order processings
			this.filteredOrderProcessings = this.orderProcessings;
		}
	}

	viewOrder(orderId: string): void {
		this.router.navigate(["view", orderId]); // Navigate to view order
	}
}
