import { Routes } from "@angular/router";

export const routes: Routes = [
	{
		path: "",
		loadComponent: () =>
			import("./order-list/order-list.component").then(
				(m) => m.OrderListComponent
			),
		data: {
			title: "Order",
		},
	},
	{
		path: "add",
		loadComponent: () =>
			import("./order-add/order-add.component").then(
				(m) => m.OrderAddComponent
			),
	},
	{
		path: "view/:id",
		loadComponent: () =>
			import("./order-view/order-view.component").then(
				(m) => m.OrderViewComponent
			),
	},
	{
		path: "update-status/:id",
		loadComponent: () =>
			import("./order-status-update/order-status-update.component").then(
				(m) => m.OrderStatusUpdateComponent
			),
	},

	// {
	// 	path: "delete/:sku",
	// 	loadComponent: () =>
	// 		import("./order-delete/order-delete.component").then(
	// 			(m) => m.OrderDeleteComponent
	// 		),
	// },
];
