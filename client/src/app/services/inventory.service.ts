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

	// getInventoryItemById(id: number): Observable<InventoryItem> {
	// 	return this.http.get<InventoryItem>(`${this.apiUrl}/${id}`);
	// }

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

	// updateInventoryItem(
	// 	id: number,
	// 	item: InventoryItem
	// ): Observable<InventoryItem> {
	// 	return this.http.put<InventoryItem>(`${this.apiUrl}/${id}`, item);
	// }

	// deleteInventoryItem(id: number): Observable<void> {
	// 	return this.http.delete<void>(`${this.apiUrl}/${id}`);
	// }
}
