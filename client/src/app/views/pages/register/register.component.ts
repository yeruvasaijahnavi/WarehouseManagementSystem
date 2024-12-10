import { Component, inject } from "@angular/core";
import { IconDirective } from "@coreui/icons-angular";
import {
	ContainerComponent,
	RowComponent,
	ColComponent,
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
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"],
	imports: [
		ContainerComponent,
		RowComponent,
		ColComponent,
		TextColorDirective,
		CardComponent,
		CardBodyComponent,
		FormDirective,
		InputGroupComponent,
		InputGroupTextDirective,
		IconDirective,
		FormControlDirective,
		ButtonDirective,
		FormsModule,
		CommonModule,
		AlertComponent,
	],
})
export class RegisterComponent {
	registerObj: any = {
		username: "",
		email: "",
		password: "",
		role: "",
		name: "", // Add name field here
	};

	errorMessage: string = ""; // To store the error message

	authService = inject(AuthService);
	router = inject(Router);

	onSubmit() {
		this.authService.signup(this.registerObj).subscribe({
			next: (response) => {
				alert("Account created successfully!");
				this.router.navigate(["/login"]); // Redirect to login after successful registration
			},
			error: (error) => {
				// Set the error message to display in the alert
				this.errorMessage =
					error.error?.message ||
					"An error occurred during registration.";
			},
			complete: () => {
				console.log("Registration request successful");
			},
		});
	}
}
