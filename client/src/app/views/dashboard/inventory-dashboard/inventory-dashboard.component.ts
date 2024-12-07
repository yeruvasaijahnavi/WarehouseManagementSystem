import { Component } from "@angular/core";
import { InventoryDashboardService } from "../../../services/inventory-dashboard.service";
import { cilInbox } from "@coreui/icons";
import { ReactiveFormsModule } from "@angular/forms";
import { IconModule } from "@coreui/icons-angular";
import { ChartjsModule } from "@coreui/angular-chartjs";
import {
	ColComponent,
	DropdownModule,
	ProgressModule,
	RowComponent,
	SharedModule,
	WidgetModule,
	GridModule,
} from "@coreui/angular";

@Component({
	selector: "app-inventory-dashboard",
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
	],
	templateUrl: "./inventory-dashboard.component.html",
	styleUrl: "./inventory-dashboard.component.scss",
})
export class InventoryDashboardComponent {
	public totalInventoryValue: number | null = null;
	public totalInventoryQuantity: number | null = null;
	public loading = true; // For a loading indicator
	icons = { cilInbox };
	constructor(private inventoryDashboardService: InventoryDashboardService) {}
	ngOnInit(): void {
		this.fetchInventoryTotalValue();
		this.fetchInventoryTotalQuantity();
	}
	fetchInventoryTotalValue(): void {
		this.inventoryDashboardService.getInventoryTotalValue().subscribe({
			next: (data: any) => {
				// Access the first element of the array and then get totalValue
				if (data && data.length > 0) {
					this.totalInventoryValue = data[0].totalValue;
					console.log(
						"Total inventory value:",
						this.totalInventoryValue
					);
				} else {
					console.log("No data found");
					this.totalInventoryValue = 0; // Handle no data case
				}
				this.loading = false;
			},
			error: (err) => {
				console.error("Error fetching inventory total value:", err);
				this.loading = false;
			},
		});
	}

	fetchInventoryTotalQuantity(): void {
		this.inventoryDashboardService.getInventoryTotalQuantity().subscribe({
			next: (data: any) => {
				if (data && data.length > 0) {
					this.totalInventoryQuantity = data[0].totalQuantity;
				} else {
					this.totalInventoryQuantity = 0;
				}
			},
			error: (err) => {
				console.error("Error fetching inventory total quantity:", err);
			},
		});
	}
}
