import { Component, OnInit, inject } from "@angular/core";
import { AlertService } from "../../services/alert.service";
import { CommonModule } from "@angular/common";
import { AlertsDashboardComponent } from "../dashboard/alerts-dashboard/alerts-dashboard.component";

@Component({
	selector: "app-stock-alerts",
	templateUrl: "./stock-alerts.component.html",
	styleUrls: ["./stock-alerts.component.scss"],
	standalone: true,
	imports: [CommonModule, AlertsDashboardComponent],
})
export class StockAlertsComponent implements OnInit {
	alerts: any[] = [];
	errorMessage: string = "";

	alertService = inject(AlertService);

	ngOnInit(): void {
		this.loadStockAlerts();
	}

	loadStockAlerts(): void {
		this.alertService.getStockAlerts().subscribe({
			next: (data: any[]) => {
				this.alerts = data;
			},
			error: (error: any) => {
				console.error("Error loading stock alerts:", error);
				this.errorMessage = "Failed to load stock alerts.";
			},
		});
	}
}
