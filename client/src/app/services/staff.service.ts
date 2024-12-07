import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class StaffService {
	baseUrl = "http://localhost:3000/staff"; // Update this if necessary

	constructor(private http: HttpClient) {}

	getStaffMembers() {
		return this.http.get<any[]>(this.baseUrl);
	}
}
