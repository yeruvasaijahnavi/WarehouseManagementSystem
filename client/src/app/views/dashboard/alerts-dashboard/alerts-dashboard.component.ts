import { Component, OnInit } from "@angular/core";
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
} from "@coreui/angular";

import { AlertDashboardService } from "../../../services/alert-dashboard.service";

@Component({
	selector: "app-alerts-dashboard",
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
	templateUrl: "./alerts-dashboard.component.html",
	styleUrl: "./alerts-dashboard.component.scss",
})
export class AlertsDashboardComponent {
	unresolvedAlerts: number | null = null;

	constructor(private alertDashboardService: AlertDashboardService) {}

	ngOnInit(): void {
		this.fetchUnresolvedAlerts();
	}

	fetchUnresolvedAlerts(): void {
		this.alertDashboardService.getUnresolvedAlertsCount().subscribe({
			next: (data: any) => (this.unresolvedAlerts = data.unresolvedCount),
			error: (err: any) =>
				console.error("Error fetching unresolved alerts:", err),
		});
	}
}
