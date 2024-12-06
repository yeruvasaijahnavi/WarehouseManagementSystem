import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class OrderService {
	baseUrl = "http://localhost:3000/orders";

	constructor(private http: HttpClient) {}

	getOrders() {
		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		const headers = new HttpHeaders().set(
			"Authorization",
			`Bearer ${token}`
		);

		return this.http.get<any[]>(this.baseUrl, { headers });
	}
	getOrderById(orderId: string) {
		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		const headers = new HttpHeaders().set(
			"Authorization",
			`Bearer ${token}`
		);

		return this.http.get<any>(`${this.baseUrl}/${orderId}`, { headers });
	}
	addOrder(order: any) {
		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		const headers = new HttpHeaders().set(
			"Authorization",
			`Bearer ${token}`
		);

		return this.http.post<any>(`${this.baseUrl}`, order, { headers });
	}
	// Update order status
	updateOrderStatus(orderId: string, status: string) {
		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		const headers = new HttpHeaders().set(
			"Authorization",
			`Bearer ${token}`
		);

		return this.http.put<any>(
			`${this.baseUrl}/${orderId}/status`,
			{ status },
			{ headers }
		);
	}
}
