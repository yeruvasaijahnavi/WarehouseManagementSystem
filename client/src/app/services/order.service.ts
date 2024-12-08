import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({
	providedIn: "root",
})
export class OrderService {
	baseUrl = `${environment.apiUrl}/orders`;

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

	assignStaff(orderId: string, staffId: string) {
		return this.http.put<any>(`${this.baseUrl}/${orderId}/assign-staff`, {
			staffId,
		});
	}
}
