import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class InventoryService {
	baseUrl = "http://localhost:3000/inventory";

	constructor(private http: HttpClient) {}

	getInventoryItems() {
		return this.http.get<any[]>(this.baseUrl);
	}

	getInventoryItemBySKU(sku: string) {
		return this.http.get<any>(`${this.baseUrl}/${sku}`);
	}

	addInventoryItem(item: any) {
		return this.http.post<any>(`${this.baseUrl}`, item);
	}

	updateInventoryItem(sku: string, updatedItem: any) {
		return this.http.put<any>(`${this.baseUrl}/${sku}`, updatedItem);
	}

	deleteInventoryItem(sku: string) {
		return this.http.delete<any>(`${this.baseUrl}/${sku}`);
	}

	getInventoryReport() {
		return this.http.get<any>(`${this.baseUrl}/report`);
	}
}
