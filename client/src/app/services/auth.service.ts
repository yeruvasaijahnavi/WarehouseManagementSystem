import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	constructor(private http: HttpClient) {}
	baseUrl = "http://localhost:3000/auth";

	signup(data: any) {
		return this.http.post(`${this.baseUrl}/register`, data);
	}
	login(data: any) {
		return this.http.post(`${this.baseUrl}/login`, data).pipe(
			tap((result) => {
				localStorage.setItem("authUser", JSON.stringify(result));
			})
		);
	}
	logout() {
		localStorage.removeItem("authUser");
	}
	isLoggedIn() {
		return localStorage.getItem("authUser") !== null;
	}
}
