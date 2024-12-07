import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class AlertDashboardService {
	baseUrl = "http://localhost:3000/dashboard";

	constructor(private http: HttpClient) {}

	getUnresolvedAlertsCount() {
		return this.http
			.get<{ unresolvedCount: number }>(
				`${this.baseUrl}/alerts-unresolved`
			)
			.pipe(
				catchError((error) => {
					console.error(
						"Error fetching unresolved alerts count",
						error
					);
					return throwError(error);
				})
			);
	}
}
