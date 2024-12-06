import { Routes } from "@angular/router";

export const routes: Routes = [
	{
		path: "",
		loadComponent: () =>
			import("./inventory-list/inventory-list.component").then(
				(m) => m.InventoryListComponent
			),
		data: {
			title: "Inventory",
		},
	},
	{
		path: "add",
		loadComponent: () =>
			import("./inventory-add/inventory-add.component").then(
				(m) => m.InventoryAddComponent
			),
	},
	{
		path: "view/:sku",
		loadComponent: () =>
			import("./inventory-view/inventory-view.component").then(
				(m) => m.InventoryViewComponent
			),
	},
	{
		path: "update/:sku",
		loadComponent: () =>
			import("./inventory-update/inventory-update.component").then(
				(m) => m.InventoryUpdateComponent
			),
	},
	{
		path: "delete/:sku",
		loadComponent: () =>
			import("./inventory-delete/inventory-delete.component").then(
				(m) => m.InventoryDeleteComponent
			),
	},
	{
		path: "report",
		loadComponent: () =>
			import("./inventory-report/inventory-report.component").then(
				(m) => m.InventoryReportComponent
			),
	},
];
