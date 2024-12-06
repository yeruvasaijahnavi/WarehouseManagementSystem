import { HttpHeaders, HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	// debugger;
	const token = localStorage.getItem("token");

	if (!token) {
		throw new Error("No token found");
	}

	const clonedReq = req.clone({
		headers: req.headers.set("Authorization", `Bearer ${token}`),
	});
	return next(clonedReq);
};
