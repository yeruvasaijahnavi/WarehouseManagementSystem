import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OrderService } from "../../../services/order.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
	selector: "app-order-status-update",
	templateUrl: "./order-status-update.component.html",
	styleUrls: ["./order-status-update.component.scss"],
	standalone: true,
	imports: [CommonModule, FormsModule],
})
export class OrderStatusUpdateComponent implements OnInit {
	orderId: string | null = null;
	status: string = "";
	validStatuses = ["pending", "assigned", "shipped", "delivered"];
	errorMessage: string = "";

	orderService = inject(OrderService);
	route = inject(ActivatedRoute);
	router = inject(Router);

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
			this.orderId = params.get("id");
			if (!this.orderId) {
				this.errorMessage = "No order ID provided.";
			}
		});
	}

	updateOrderStatus(): void {
		if (!this.orderId || !this.status) {
			this.errorMessage = "Order ID and status are required.";
			return;
		}

		if (!this.validStatuses.includes(this.status)) {
			this.errorMessage = "Invalid status.";
			return;
		}

		this.orderService
			.updateOrderStatus(this.orderId, this.status)
			.subscribe({
				next: (response: any) => {
					console.log("Order status updated successfully:", response);
					this.router.navigate(["/orders"]);
				},
				error: (error: any) => {
					console.error("Error updating order status:", error);
					this.errorMessage = "Failed to update the order status.";
				},
			});
	}
}
