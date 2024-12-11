import { Routes } from "@angular/router";
import { DefaultLayoutComponent } from "./layout";

export const routes: Routes = [
	{
		path: "",
		redirectTo: "login",
		pathMatch: "full",
	},
	{
		path: "",
		component: DefaultLayoutComponent,
		data: {
			title: "Home",
		},
		children: [
			{
				path: "dashboard",
				loadChildren: () =>
					import("./views/dashboard/routes").then((m) => m.routes),
			},
			{
				path: "inventory",
				loadChildren: () =>
					import("./views/inventory/routes").then((m) => m.routes),
			},
			{
				path: "orders",
				loadChildren: () =>
					import("./views/orders/routes").then((m) => m.routes),
			},
			{
				path: "order-processing",
				loadChildren: () =>
					import("./views/order-processing/routes").then(
						(m) => m.routes
					),
			},
			{
				path: "staff",
				loadChildren: () =>
					import("./views/staff/routes").then((m) => m.routes),
			},
			{
				path: "alerts",
				loadChildren: () =>
					import("./views/stock-alerts/routes").then((m) => m.routes),
			},
			{
				path: "logs",
				loadChildren: () =>
					import("./views/audit-logs/routes").then((m) => m.routes),
			},
		],
	},
	{
		path: "404",
		loadComponent: () =>
			import("./views/auth/page404/page404.component").then(
				(m) => m.Page404Component
			),
		data: {
			title: "Page 404",
		},
	},
	{
		path: "500",
		loadComponent: () =>
			import("./views/auth/page500/page500.component").then(
				(m) => m.Page500Component
			),
		data: {
			title: "Page 500",
		},
	},
	{
		path: "login",
		loadComponent: () =>
			import("./views/auth/login/login.component").then(
				(m) => m.LoginComponent
			),
		data: {
			title: "Login Page",
		},
	},
	{
		path: "register",
		loadComponent: () =>
			import("./views/auth/register/register.component").then(
				(m) => m.RegisterComponent
			),
		data: {
			title: "Register Page",
		},
	},
	{ path: "**", redirectTo: "login" },
];
