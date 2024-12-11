import { Routes } from "@angular/router";

export const routes: Routes = [
	{
		path: "",
		loadComponent: () =>
			import("./staff-list/staff-list.component").then(
				(m) => m.StaffListComponent
			),
		data: {
			title: "Staff List",
		},
	},
	{
		path: "view/:id",
		loadComponent: () =>
			import("./staff-view/staff-view.component").then(
				(m) => m.StaffViewComponent
			),
		data: {
			title: "Staff View",
		},
	},
];
