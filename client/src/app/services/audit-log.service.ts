import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class AuditLogService {
	private baseUrl = "http://localhost:3000/logs";

	constructor(private http: HttpClient) {}

	getAuditLogs(): Observable<any[]> {
		return this.http.get<any[]>(this.baseUrl);
	}
}
