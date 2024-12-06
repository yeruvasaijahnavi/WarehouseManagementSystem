import { Routes } from "@angular/router";

export const routes: Routes = [
	{
		path: "",
		loadComponent: () =>
			import("./stock-alerts.component").then(
				(m) => m.StockAlertsComponent
			),
		data: {
			title: "Alerts",
		},
	},
];
