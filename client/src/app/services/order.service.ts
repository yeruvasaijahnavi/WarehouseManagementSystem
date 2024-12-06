import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class OrderService {
	baseUrl = "http://localhost:3000/orders";

	constructor(private http: HttpClient) {}

	getOrders() {
		return this.http.get<any[]>(this.baseUrl);
	}

	getOrderById(orderId: string) {
		return this.http.get<any>(`${this.baseUrl}/${orderId}`);
	}

	addOrder(order: any) {
		return this.http.post<any>(`${this.baseUrl}`, order);
	}

	updateOrderStatus(orderId: string, status: string) {
		return this.http.put<any>(`${this.baseUrl}/${orderId}/status`, {
			status,
		});
	}
}
