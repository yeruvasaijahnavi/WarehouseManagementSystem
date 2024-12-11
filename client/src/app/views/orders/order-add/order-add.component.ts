import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OrderService } from "../../../services/order.service";
import { InventoryService } from "../../../services/inventory.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-order-add",
	templateUrl: "./order-add.component.html",
	styleUrls: ["./order-add.component.scss"],
	imports: [FormsModule, CommonModule],
})
export class OrderAddComponent implements OnInit {
	order = {
		customerId: "",
		sku: "",
		quantity: 0,
		status: "pending",
		shippingAddress: "",
		inventoryItemId: "", // New field
		orderDate: new Date(),
	};

	inventoryItems: any[] = [];

	constructor(
		private orderService: OrderService,
		private inventoryService: InventoryService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.loadInventoryItems();
	}

	loadInventoryItems() {
		this.inventoryService.getInventoryItems().subscribe({
			next: (items) => {
				this.inventoryItems = items;
			},
			error: (error) => {
				console.error("Error loading inventory items:", error);
			},
		});
	}

	onSKUChange(sku: string) {
		const selectedItem = this.inventoryItems.find(
			(item) => item.sku === sku
		);

		this.order.inventoryItemId = selectedItem ? selectedItem._id : "";
		console.log("Selected Inventory Item:", selectedItem, selectedItem._id);
	}

	addOrder() {
		console.log("Adding order:", this.order);
		this.orderService.addOrder(this.order).subscribe({
			next: (response) => {
				console.log("Order added successfully:", response);
				this.router.navigate(["/orders"]); // Redirect to order list page after adding
			},
			error: (error) => {
				console.error("Error adding Order:", error);
			},
		});
	}
}
