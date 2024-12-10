import { Routes } from "@angular/router";

export const routes: Routes = [
	{
		path: "",
		loadComponent: () =>
			import(
				"./order-processing-list/order-processing-list.component"
			).then((m) => m.OrderProcessingListComponent),
		data: {
			title: "Order Processing",
		},
	},
	// {
	// 	path: "add",
	// 	loadComponent: () =>
	// 		import("./order-add/order-add.component").then(
	// 			(m) => m.OrderAddComponent
	// 		),
	// },
	{
		path: "view/:id",
		loadComponent: () =>
			import(
				"./order-processing-view/order-processing-view.component"
			).then((m) => m.OrderProcessingViewComponent),
	},
	// {
	// 	path: "assign-staff/:id",
	// 	loadComponent: () =>
	// 		import("./assign-staff/assign-staff.component").then(
	// 			(m) => m.AssignStaffComponent
	// 		),
	// },
	// {
	// 	path: "update-status/:id",
	// 	loadComponent: () =>
	// 		import("./order-status-update/order-status-update.component").then(
	// 			(m) => m.OrderStatusUpdateComponent
	// 		),
	// },

	// // {
	// // 	path: "delete/:sku",
	// // 	loadComponent: () =>
	// // 		import("./order-delete/order-delete.component").then(
	// // 			(m) => m.OrderDeleteComponent
	// // 		),
	// // },
];
