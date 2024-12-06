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
} from "@coreui/angular";
import { FormsModule } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

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
	],
})
export class RegisterComponent {
	registerObj: any = {
		username: "",
		email: "",
		password: "",
		role: "",
	};

	authService = inject(AuthService);
	router = inject(Router);

	onSubmit() {
		this.authService.signup(this.registerObj).subscribe({
			next: (response) => {
				alert("Account created successfully!");
				this.router.navigate(["/login"]); // Redirect to login after successful registration
			},
			error: (error) => {
				alert(`Error: ${JSON.stringify(error.error)}`);
			},
			complete: () => {
				console.log("Registration request successful");
			},
		});
	}
}
