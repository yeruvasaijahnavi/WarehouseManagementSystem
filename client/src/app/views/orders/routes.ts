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
	// {
	// 	path: "add",
	// 	loadComponent: () =>
	// 		import("./order-add/order-add.component").then(
	// 			(m) => m.OrderAddComponent
	// 		),
	// },
	// {
	// 	path: "view/:sku",
	// 	loadComponent: () =>
	// 		import("./order-view/order-view.component").then(
	// 			(m) => m.OrderViewComponent
	// 		),
	// },
	// {
	// 	path: "update/:sku",
	// 	loadComponent: () =>
	// 		import("./order-update/order-update.component").then(
	// 			(m) => m.OrderUpdateComponent
	// 		),
	// },
	// {
	// 	path: "delete/:sku",
	// 	loadComponent: () =>
	// 		import("./order-delete/order-delete.component").then(
	// 			(m) => m.OrderDeleteComponent
	// 		),
	// },
];
