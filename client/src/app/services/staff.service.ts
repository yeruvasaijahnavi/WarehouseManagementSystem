import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({
	providedIn: "root",
})
export class StaffService {
	baseUrl = `${environment.apiUrl}/staff`; // Update this if necessary

	constructor(private http: HttpClient) {}

	getStaffMembers() {
		return this.http.get<any[]>(this.baseUrl);
	}
}
