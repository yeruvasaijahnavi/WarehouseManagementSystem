import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { DocsExampleComponent } from "@docs-components/public-api";

import {
	RowComponent,
	ColComponent,
	TextColorDirective,
	CardComponent,
	CardHeaderComponent,
	CardBodyComponent,
	NavComponent,
	NavItemComponent,
	NavLinkDirective,
	ThemeDirective,
	DropdownComponent,
	DropdownToggleDirective,
	DropdownMenuDirective,
	DropdownItemDirective,
} from "@coreui/angular";
import { AuthService } from "src/app/services/auth.service";

@Component({
	selector: "app-navs",
	templateUrl: "./navs.component.html",
	styleUrls: ["./navs.component.scss"],
	imports: [
		RowComponent,
		ColComponent,
		TextColorDirective,
		CardComponent,
		CardHeaderComponent,
		CardBodyComponent,
		DocsExampleComponent,
		NavComponent,
		NavItemComponent,
		NavLinkDirective,
		RouterLink,
		ThemeDirective,
		DropdownComponent,
		DropdownToggleDirective,
		DropdownMenuDirective,
		DropdownItemDirective,
	],
})
export class NavsComponent {
	userName: string = "";

	constructor(private authService: AuthService) {
		// Fetch user details on component initialization
		// const user = this.authService.getUser(); // Assumes `getUser()` returns user details
		// if (user) {
		// 	this.userName = user.name;
		// 	this.userRole = user.role;
		// }
	}

	logout() {
		this.authService.logout();
	}
}
