import { a as I } from "./chunk-2KAOWCLR.js";
import {
	b as S,
	c as h,
	d as M,
	g as _,
	j as C,
	k as A,
	l as w,
	q as O,
	r as v,
	s as b,
	t as E,
	u as W,
	w as q,
} from "./chunk-YHGVW4GW.js";
import "./chunk-KEDPSKOD.js";
import { h as f } from "./chunk-OBMS4ODY.js";
import {
	Rb as t,
	Sb as n,
	_b as y,
	ab as a,
	bb as g,
	nc as i,
	pb as c,
	sc as l,
	tc as s,
	uc as m,
} from "./chunk-HB3EFGHP.js";
import "./chunk-JKOY2XUY.js";
var V = (() => {
	class p {
		constructor(o, d) {
			(this.orderService = o),
				(this.router = d),
				(this.order = {
					orderId: "",
					customerId: "",
					sku: "",
					quantity: 0,
					status: "pending",
					shippingAddress: "",
					orderDate: new Date(),
				});
		}
		ngOnInit() {}
		addOrder() {
			this.orderService.addOrder(this.order).subscribe({
				next: (o) => {
					console.log("Order added successfully:", o),
						this.router.navigate(["/order"]);
				},
				error: (o) => {
					console.error("Error adding Order:", o);
				},
			});
		}
		static {
			this.ɵfac = function (d) {
				return new (d || p)(g(I), g(f));
			};
		}
		static {
			this.ɵcmp = c({
				type: p,
				selectors: [["app-order-add"]],
				decls: 35,
				vars: 5,
				consts: [
					[1, "container", "mt-4"],
					[1, "mb-4"],
					[1, "row", "g-3", 3, "ngSubmit"],
					[1, "col-md-6", "form-floating"],
					[
						"id",
						"customerId",
						"type",
						"text",
						"name",
						"customerId",
						"required",
						"",
						1,
						"form-control",
						3,
						"ngModelChange",
						"ngModel",
					],
					["for", "customerId"],
					[
						"id",
						"sku",
						"type",
						"text",
						"name",
						"sku",
						"required",
						"",
						1,
						"form-control",
						3,
						"ngModelChange",
						"ngModel",
					],
					["for", "sku"],
					[1, "col-md-4", "form-floating"],
					[
						"id",
						"quantity",
						"type",
						"number",
						"name",
						"quantity",
						"min",
						"1",
						"required",
						"",
						1,
						"form-control",
						3,
						"ngModelChange",
						"ngModel",
					],
					["for", "quantity"],
					[
						"id",
						"status",
						"name",
						"status",
						"required",
						"",
						1,
						"form-select",
						3,
						"ngModelChange",
						"ngModel",
					],
					["value", "pending"],
					["value", "assigned"],
					["value", "shipped"],
					["value", "delivered"],
					["for", "status"],
					[
						"id",
						"shippingAddress",
						"type",
						"text",
						"name",
						"shippingAddress",
						"required",
						"",
						1,
						"form-control",
						3,
						"ngModelChange",
						"ngModel",
					],
					["for", "shippingAddress"],
					[1, "col-12"],
					["type", "submit", 1, "btn", "btn-primary"],
				],
				template: function (d, r) {
					d & 1 &&
						(t(0, "div", 0)(1, "h2", 1),
						i(2, "Add New Order"),
						n(),
						t(3, "form", 2),
						y("ngSubmit", function () {
							return r.addOrder();
						}),
						t(4, "div", 3)(5, "input", 4),
						m("ngModelChange", function (e) {
							return (
								s(r.order.customerId, e) ||
									(r.order.customerId = e),
								e
							);
						}),
						n(),
						t(6, "label", 5),
						i(7, "Customer ID"),
						n()(),
						t(8, "div", 3)(9, "input", 6),
						m("ngModelChange", function (e) {
							return s(r.order.sku, e) || (r.order.sku = e), e;
						}),
						n(),
						t(10, "label", 7),
						i(11, "SKU"),
						n()(),
						t(12, "div", 8)(13, "input", 9),
						m("ngModelChange", function (e) {
							return (
								s(r.order.quantity, e) ||
									(r.order.quantity = e),
								e
							);
						}),
						n(),
						t(14, "label", 10),
						i(15, "Quantity"),
						n()(),
						t(16, "div", 8)(17, "select", 11),
						m("ngModelChange", function (e) {
							return (
								s(r.order.status, e) || (r.order.status = e), e
							);
						}),
						t(18, "option", 12),
						i(19, "Pending"),
						n(),
						t(20, "option", 13),
						i(21, "In Progress"),
						n(),
						t(22, "option", 14),
						i(23, "Shipped"),
						n(),
						t(24, "option", 15),
						i(25, "Delivered"),
						n()(),
						t(26, "label", 16),
						i(27, "Status"),
						n()(),
						t(28, "div", 8)(29, "input", 17),
						m("ngModelChange", function (e) {
							return (
								s(r.order.shippingAddress, e) ||
									(r.order.shippingAddress = e),
								e
							);
						}),
						n(),
						t(30, "label", 18),
						i(31, "Shipping Address"),
						n()(),
						t(32, "div", 19)(33, "button", 20),
						i(34, "Add Order"),
						n()()()()),
						d & 2 &&
							(a(5),
							l("ngModel", r.order.customerId),
							a(4),
							l("ngModel", r.order.sku),
							a(4),
							l("ngModel", r.order.quantity),
							a(4),
							l("ngModel", r.order.status),
							a(12),
							l("ngModel", r.order.shippingAddress));
				},
				dependencies: [q, A, v, b, S, w, O, h, M, W, E, C, _],
				encapsulation: 2,
			});
		}
	}
	return p;
})();
export { V as OrderAddComponent };
