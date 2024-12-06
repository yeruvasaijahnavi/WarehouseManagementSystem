import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export class AuthGuard {
	constructor() {}
	authService = inject(AuthService);
	router = inject(Router);
	canActivate() {
		if (this.authService.isLoggedIn()) {
			return true;
		} else {
			this.router.navigate(["/login"]);
			return false;
		}
	}
}
