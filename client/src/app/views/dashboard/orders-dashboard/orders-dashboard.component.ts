import { OrderDashboardService } from "../../../services/orders-dashboard.service";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { IconModule } from "@coreui/icons-angular";
import { ChartjsModule } from "@coreui/angular-chartjs";
import {
	ColComponent,
	DropdownModule,
	GridModule,
	ProgressModule,
	RowComponent,
	SharedModule,
	WidgetModule,
} from "@coreui/angular";
import { CommonModule } from "@angular/common";

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
		GridModule,
		CommonModule,
	],
})
export class OrdersDashboardComponent implements OnInit {
	totalOrders: number | null = null;
	customerCount: number | null = null;
	pieChartData = {
		labels: [] as string[],
		datasets: [
			{
				backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
				data: [] as number[],
			},
		],
	};
	data = {
		labels: ["VueJs", "EmberJs", "ReactJs", "Angular"],
		datasets: [
			{
				backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
				data: [40, 20, 80, 10],
			},
		],
	};
	isPieChartDataLoaded: boolean = false;

	constructor(private orderDashboardService: OrderDashboardService) {}

	ngOnInit(): void {
		this.fetchTotalOrders();
		this.fetchDistinctCustomerCount();
		this.fetchOrderStatusDistribution();
	}
	fetchOrderStatusDistribution(): void {
		this.orderDashboardService.getOrderStatusDistribution().subscribe({
			next: (data) => {
				this.pieChartData.labels = data.map((item) => item.status);
				this.pieChartData.datasets[0].data = data.map(
					(item) => item.count
				);
				this.isPieChartDataLoaded = true; // Data is now loaded
				console.log(
					"Pie chart data loaded:",
					this.pieChartData.labels,
					this.pieChartData.datasets[0].data
				);
			},
			error: (err) =>
				console.error("Error fetching order status distribution:", err),
		});
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
