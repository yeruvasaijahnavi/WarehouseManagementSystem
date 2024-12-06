import { Component, inject } from "@angular/core";
import { NgStyle } from "@angular/common";
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
	],
})
export class LoginComponent {
	loginObj: any = {
		username: "",
		password: "",
	};

	authService = inject(AuthService);
	router = inject(Router);

	onSubmit() {
		debugger;
		this.authService.login(this.loginObj).subscribe({
			next: (response) => {
				const token = response.token;
				localStorage.setItem("token", token);

				this.router.navigate(["/inventory"]);
			},
			error: (error) => {
				alert(`Error: ${JSON.stringify(error.error)}`);
			},
			complete: () => {
				console.log("Login request successful");
			},
		});
	}
}
