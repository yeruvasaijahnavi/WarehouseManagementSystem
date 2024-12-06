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
];
