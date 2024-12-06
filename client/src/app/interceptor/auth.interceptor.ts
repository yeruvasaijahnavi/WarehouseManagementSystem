import { HttpHeaders, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	// debugger;
	const token = localStorage.getItem("token");
	const router = inject(Router);

	// skip for login
	if (req.url.includes("/login") || req.url.includes("/register")) {
		return next(req); // Don't modify the request for login or register routes
	}
	if (!token) {
		router.navigate(["/login"]);
		throw new Error("No token found");
	}

	const clonedReq = req.clone({
		headers: req.headers.set("Authorization", `Bearer ${token}`),
	});
	return next(clonedReq);
};
