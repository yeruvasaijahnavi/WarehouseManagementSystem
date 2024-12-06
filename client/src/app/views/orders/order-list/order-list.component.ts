import { Component, OnInit, inject } from "@angular/core";
import { OrderService } from "../../../services/order.service";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
	selector: "app-order-list",
	templateUrl: "./order-list.component.html",
	styleUrls: ["./order-list.component.scss"],
	imports: [CommonModule],
})
export class OrderListComponent implements OnInit {
	orderList: any[] = [];
	orderService = inject(OrderService);
	router = inject(Router);

	ngOnInit(): void {
		this.orderService.getOrders().subscribe((orders: any) => {
			this.orderList = orders;
		});
	}

	viewOrder(orderId: string): void {
		console.log("Viewing order with ID:", orderId);
		this.router.navigate([`/orders/view/${orderId}`]);
	}
}
