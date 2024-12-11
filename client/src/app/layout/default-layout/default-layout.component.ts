import { Component, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { NgScrollbar } from "ngx-scrollbar";

import { IconDirective } from "@coreui/icons-angular";
import {
	ContainerComponent,
	ShadowOnScrollDirective,
	SidebarBrandComponent,
	SidebarComponent,
	SidebarFooterComponent,
	SidebarHeaderComponent,
	SidebarNavComponent,
	SidebarToggleDirective,
	SidebarTogglerDirective,
} from "@coreui/angular";

import { DefaultFooterComponent, DefaultHeaderComponent } from "./";
import { navItems } from "./_nav";
import { AuthService } from "src/app/services/auth.service";

function isOverflown(element: HTMLElement) {
	return (
		element.scrollHeight > element.clientHeight ||
		element.scrollWidth > element.clientWidth
	);
}

@Component({
	selector: "app-dashboard",
	templateUrl: "./default-layout.component.html",
	styleUrls: ["./default-layout.component.scss"],
	imports: [
		SidebarComponent,
		SidebarHeaderComponent,
		SidebarBrandComponent,
		RouterLink,
		NgScrollbar,
		SidebarNavComponent,
		SidebarFooterComponent,
		SidebarToggleDirective,
		SidebarTogglerDirective,
		DefaultHeaderComponent,
		ShadowOnScrollDirective,
		ContainerComponent,
		RouterOutlet,
		DefaultFooterComponent,
	],
})
export class DefaultLayoutComponent {
	public navItems = navItems;

	constructor() {}
	authService = inject(AuthService);
	ngOnInit(): void {
		this.filterNavItems();
	}

	// Method to check the user role and filter out the 'Staff' item
	filterNavItems() {
		const userRole = this.getUserRole(); // Get the current user's role
		const itemsToHide = [
			"Staff",
			"Audit Logs",
			"Dashboard",
			"Inventory Report",
		]; // Array of items to hide for 'staff' role

		if (userRole === "staff") {
			// Filter out items listed in itemsToHide
			this.navItems = this.navItems.filter(
				(item) => item.name && !itemsToHide.includes(item.name)
			);
		}
	}

	// Example function to get the user role (replace this with your actual logic)
	getUserRole(): string {
		return this.authService.getUser().role;
	}

	onScrollbarUpdate($event: any) {
		// Uncomment and implement if needed
		// if ($event.verticalUsed) {
		//   console.log('verticalUsed', $event.verticalUsed);
		// }
	}
}
