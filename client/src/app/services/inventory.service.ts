import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class InventoryService {
	baseUrl = "http://localhost:3000/inventory";

	constructor(private http: HttpClient) {}

	getInventoryItems() {
		const token = localStorage.getItem("token"); // Ensure the token is stored on login

		if (!token) {
			throw new Error("No token found");
		}

		const headers = new HttpHeaders().set(
			"Authorization",
			`Bearer ${token}`
		);

		return this.http.get<any[]>(this.baseUrl, { headers });
	}

	getInventoryItemBySKU(sku: string) {
		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		const headers = new HttpHeaders().set(
			"Authorization",
			`Bearer ${token}`
		);

		return this.http.get<any>(`${this.baseUrl}/${sku}`, { headers });
	}

	addInventoryItem(item: any) {
		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		const headers = new HttpHeaders().set(
			"Authorization",
			`Bearer ${token}`
		);

		return this.http.post<any>(`${this.baseUrl}`, item, { headers });
	}

	updateInventoryItem(sku: string, updatedItem: any) {
		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		const headers = new HttpHeaders().set(
			"Authorization",
			`Bearer ${token}`
		);

		return this.http.put<any>(`${this.baseUrl}/${sku}`, updatedItem, {
			headers,
		});
	}

	deleteInventoryItem(sku: string) {
		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		const headers = new HttpHeaders().set(
			"Authorization",
			`Bearer ${token}`
		);

		return this.http.delete<any>(`${this.baseUrl}/${sku}`, { headers });
	}
}
