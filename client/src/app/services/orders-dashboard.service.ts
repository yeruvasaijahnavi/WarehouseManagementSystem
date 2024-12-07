import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class OrderDashboardService {
	private baseUrl = "http://localhost:3000/dashboard"; // Replace with your API base URL

	constructor(private http: HttpClient) {}

	getTotalOrders(): Observable<{ totalOrders: number }> {
		return this.http.get<{ totalOrders: number }>(
			`${this.baseUrl}/orders-total-count`
		);
	}

	getDistinctCustomerCount(): Observable<{ distinctCustomers: number }> {
		return this.http.get<{ distinctCustomers: number }>(
			`${this.baseUrl}/orders-distinct-customers`
		);
	}
}
