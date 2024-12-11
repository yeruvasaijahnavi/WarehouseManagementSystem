import { Component, OnInit, inject } from "@angular/core";
import { OrderService } from "../../../services/order.service";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { OrdersDashboardComponent } from "../../dashboard/orders-dashboard/orders-dashboard.component";
import { TableModule } from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { AuthService } from "src/app/services/auth.service"; // Import the AuthService

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
	filteredOrderList: any[] = [];
	orderService = inject(OrderService);
	router = inject(Router);
	authService = inject(AuthService); // Inject the AuthService

	ngOnInit(): void {
		this.orderService.getOrders().subscribe((orders: any) => {
			this.orderList = orders;

			// Filter orders based on the user role
			this.filterOrders();
		});
	}

	// Filter orders based on staff assignment (only if the user is a staff)
	filterOrders(): void {
		const currentUser = this.authService.getUser(); // Get the current user info
		console.log(this.orderList, currentUser);
		if (currentUser.role === "staff") {
			// If the user is staff, only show orders assigned to them
			this.filteredOrderList = this.orderList.filter(
				(order) => order.assignedStaff?.email === currentUser.email
			);
		} else {
			// If the user is admin or other roles, show all orders
			this.filteredOrderList = this.orderList;
		}
	}

	viewOrder(orderId: string): void {
		console.log("Viewing order with ID:", orderId);
		this.router.navigate([`/orders/view/${orderId}`]);
	}

	assignStaff(orderId: string): void {
		this.router.navigate([`/orders/assign-staff/${orderId}`]);
	}

	isRole(role: string): boolean {
		return this.authService.hasRole(role);
	}
}
