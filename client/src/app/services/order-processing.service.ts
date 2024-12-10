// src/app/services/order-processing.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class OrderProcessingService {
	baseUrl = `${environment.apiUrl}/orderProcessing`;

	constructor(private http: HttpClient) {}

	// Fetch all order processing details
	getAllOrderProcessing(): Observable<any> {
		return this.http.get<any>(this.baseUrl);
	}
	// src/app/services/order-processing.service.ts
	getOrderDetails(orderId: string): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/${orderId}`);
	}
}
