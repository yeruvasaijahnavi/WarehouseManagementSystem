import { Component, OnInit } from "@angular/core";
import { OrderDashboardService } from "../../../services/orders-dashboard.service";
import { ReactiveFormsModule } from "@angular/forms";
import { IconModule } from "@coreui/icons-angular";
import { ChartjsModule } from "@coreui/angular-chartjs";
import {
	CardComponent,
	ColComponent,
	DropdownModule,
	ProgressModule,
	RowComponent,
	SharedModule,
	WidgetModule,
} from "@coreui/angular";

@Component({
	selector: "app-order-dashboard",
	templateUrl: "./orders-dashboard.component.html",
	styleUrls: ["./orders-dashboard.component.scss"],
	imports: [
		ReactiveFormsModule,
		SharedModule,
		WidgetModule,
		ProgressModule,
		DropdownModule,
		ChartjsModule,
		IconModule,
		ColComponent,
		RowComponent,
	],
})
export class OrdersDashboardComponent implements OnInit {
	totalOrders: number | null = null;
	customerCount: number | null = null;

	constructor(private orderDashboardService: OrderDashboardService) {}

	ngOnInit(): void {
		this.fetchTotalOrders();
		this.fetchDistinctCustomerCount();
	}

	fetchTotalOrders(): void {
		this.orderDashboardService.getTotalOrders().subscribe({
			next: (data) => {
				console.log(data);
				this.totalOrders = data.totalOrders;
			},
			error: (err) => console.error("Error fetching total orders:", err),
		});
	}

	fetchDistinctCustomerCount(): void {
		this.orderDashboardService.getDistinctCustomerCount().subscribe({
			next: (data) => {
				console.log("dist cust", data);
				this.customerCount = data.distinctCustomers;
			},
			error: (err) =>
				console.error("Error fetching customer count:", err),
		});
	}
}
