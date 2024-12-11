import { CommonModule, DOCUMENT, NgStyle } from "@angular/common";
import { OrdersDashboardComponent } from "./orders-dashboard/orders-dashboard.component";
import { AlertsDashboardComponent } from "./alerts-dashboard/alerts-dashboard.component";
import { InventoryDashboardComponent } from "./inventory-dashboard/inventory-dashboard.component";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ChartOptions } from "chart.js";
import { GridModule } from "@coreui/angular";
import { ChartjsComponent, ChartjsModule } from "@coreui/angular-chartjs";
import { IconDirective, IconModule } from "@coreui/icons-angular";

import {
	DropdownModule,
	ProgressModule,
	SharedModule,
	WidgetModule,
} from "@coreui/angular";

import { cilInbox } from "@coreui/icons";

interface IUser {
	name: string;
	state: string;
	registered: string;
	country: string;
	usage: number;
	period: string;
	payment: string;
	activity: string;
	avatar: string;
	status: string;
	color: string;
}

@Component({
	templateUrl: "dashboard.component.html",
	styleUrls: ["dashboard.component.scss"],
	imports: [
		DropdownModule,
		ProgressModule,
		SharedModule,
		IconModule,
		ChartjsModule,
		WidgetModule,
		CommonModule,
		OrdersDashboardComponent,
		AlertsDashboardComponent,
		InventoryDashboardComponent,
		GridModule,
	],
})
export class DashboardComponent implements OnInit {
	ngOnInit(): void {}
}
