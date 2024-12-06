import { Component, OnInit, inject } from "@angular/core";
import { InventoryService } from "../../../services/inventory.service";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-inventory-report",
	templateUrl: "./inventory-report.component.html",
	styleUrls: ["./inventory-report.component.scss"],
	standalone: true,
	imports: [CommonModule],
})
export class InventoryReportComponent implements OnInit {
	totalValue: number = 0;
	report: any[] = [];
	errorMessage: string = "";

	private inventoryService = inject(InventoryService);

	ngOnInit(): void {
		this.fetchInventoryReport();
	}

	fetchInventoryReport(): void {
		this.inventoryService.getInventoryReport().subscribe({
			next: (response) => {
				this.totalValue = response.totalValue;
				this.report = response.detailedReport;
			},
			error: (error) => {
				console.error("Error fetching report:", error);
				this.errorMessage = "Failed to load inventory report.";
			},
		});
	}
}
