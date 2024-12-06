import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class AlertService {
	baseUrl = "http://localhost:3000/alerts";

	constructor(private http: HttpClient) {}

	getStockAlerts() {
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
}
