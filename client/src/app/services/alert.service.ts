import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class AlertService {
	baseUrl = "http://localhost:3000/alerts";

	constructor(private http: HttpClient) {}

	getStockAlerts() {
		return this.http.get<any[]>(this.baseUrl);
	}
}
