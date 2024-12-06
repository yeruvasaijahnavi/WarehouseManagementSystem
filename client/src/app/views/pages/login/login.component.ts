import { Component, inject } from "@angular/core";
import { CommonModule, NgStyle } from "@angular/common";
import { IconDirective } from "@coreui/icons-angular";
import {
	ContainerComponent,
	RowComponent,
	ColComponent,
	CardGroupComponent,
	TextColorDirective,
	CardComponent,
	CardBodyComponent,
	FormDirective,
	InputGroupComponent,
	InputGroupTextDirective,
	FormControlDirective,
	ButtonDirective,
	AlertComponent,
} from "@coreui/angular";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
	imports: [
		ContainerComponent,
		RowComponent,
		ColComponent,
		CardGroupComponent,
		TextColorDirective,
		CardComponent,
		CardBodyComponent,
		FormDirective,
		InputGroupComponent,
		InputGroupTextDirective,
		IconDirective,
		FormControlDirective,
		ButtonDirective,
		NgStyle,
		FormsModule,
		AlertComponent,
		CommonModule,
	],
})
export class LoginComponent {
	loginObj: any = {
		username: "",
		password: "",
	};

	errorMessage: string = ""; // Variable to hold the error message

	authService = inject(AuthService);
	router = inject(Router);

	onSubmit() {
		this.authService.login(this.loginObj).subscribe({
			next: (response) => {
				const token = response.token;
				if (token) {
					localStorage.setItem("token", token);
					this.router.navigate(["/inventory"]);
				}
			},
			error: (error) => {
				console.error(error);
				// Show error message in the alert
				this.errorMessage = `Login failed: ${
					error.error.message || "Invalid credentials"
				}`;
			},
			complete: () => {
				console.log("Login request complete");
			},
		});
	}
}
