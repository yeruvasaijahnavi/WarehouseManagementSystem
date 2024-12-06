import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class AuditLogService {
	private baseUrl = "http://localhost:3000/logs";

	constructor(private http: HttpClient) {}

	getAuditLogs(): Observable<any[]> {
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
