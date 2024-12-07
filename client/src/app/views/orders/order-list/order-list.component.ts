import { Component, OnInit, inject } from "@angular/core";
import { OrderService } from "../../../services/order.service";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { OrdersDashboardComponent } from "../../dashboard/orders-dashboard/orders-dashboard.component";
import { TableModule } from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";

@Component({
	selector: "app-order-list",
	templateUrl: "./order-list.component.html",
	styleUrls: ["./order-list.component.scss"],
	imports: [
		CommonModule,
		OrdersDashboardComponent,
		TableModule,
		IconDirective,
	],
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
	assignStaff(orderId: string): void {
		this.router.navigate([`/orders/assign-staff/${orderId}`]);
	}
}
