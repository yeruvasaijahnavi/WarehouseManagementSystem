import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
	{
		name: "Dashboard",
		url: "/dashboard",
		iconComponent: { name: "cil-speedometer" },
		badge: {
			color: "info",
			text: "NEW",
		},
	},
	{
		name: "Inventory",
		url: "/inventory",
		iconComponent: { name: "cil-grid" },
	},
	{
		name: "Inventory Report",
		url: "/inventory/report",
		iconComponent: { name: "cil-chart" },
	},

	{
		name: "Orders",
		url: "/orders",
		iconComponent: { name: "cil-basket" },
	},
	{
		name: "Orders Processing",
		url: "/order-processing",
		iconComponent: { name: "cil-loop-circular" },
	},
	{
		name: "Staff",
		url: "/staff",
		iconComponent: { name: "cil-user" },
	},
	{
		name: "Stock Alerts",
		url: "/alerts",
		iconComponent: { name: "cil-bell" },
	},
	{
		name: "Audit Logs",
		url: "/logs",
		iconComponent: { name: "cil-list" },
	},
];
