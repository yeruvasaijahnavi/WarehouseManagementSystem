import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OrderService } from "../../../services/order.service";
import { FormsModule } from "@angular/forms";

@Component({
	selector: "app-order-add",
	templateUrl: "./order-add.component.html",
	styleUrls: ["./order-add.component.scss"],
	imports: [FormsModule],
})
export class OrderAddComponent implements OnInit {
	order = {
		orderId: "",
		customerId: "",
		sku: "",
		quantity: 0,
		status: "pending",
		shippingAddress: "",
		orderDate: new Date(),
	};

	constructor(private orderService: OrderService, private router: Router) {}

	ngOnInit(): void {}

	addOrder() {
		this.orderService.addOrder(this.order).subscribe({
			next: (response) => {
				console.log("Order added successfully:", response);
				this.router.navigate(["/order"]); // Redirect to order list page after adding
			},
			error: (error) => {
				console.error("Error adding Order:", error);
			},
		});
	}
}
