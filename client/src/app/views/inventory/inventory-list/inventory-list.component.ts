import { Component, inject, OnInit } from "@angular/core";
import { InventoryService } from "../../../services/inventory.service";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { IconDirective } from "@coreui/icons-angular";
import { TableModule, UtilitiesModule } from "@coreui/angular";
import { AuthService } from "src/app/services/auth.service";
@Component({
	selector: "app-inventory-list",
	imports: [CommonModule, TableModule, UtilitiesModule, IconDirective],
	templateUrl: "./inventory-list.component.html",
	styleUrl: "./inventory-list.component.scss",
})
export class InventoryListComponent implements OnInit {
	inventoryList: any[] = [];
	inventoryService = inject(InventoryService);
	authService = inject(AuthService);
	router = inject(Router);
	sku: string | undefined;
	ngOnInit(): void {
		this.inventoryService.getInventoryItems().subscribe((items: any) => {
			this.inventoryList = items;
		});
	}
	addInventory(): void {
		this.router.navigate(["/inventory/add"]);
	}

	viewInventoryItem(sku: string): void {
		console.log("Viewing item with sku:", sku);
		this.router.navigate([`/inventory/view/${sku}`]);
	}
	updateInventoryItem(sku: string): void {
		console.log("Navigating to update item with sku:", sku);
		this.router.navigate([`/inventory/update/${sku}`]);
	}
	deleteInventoryItem(sku: string): void {
		console.log("Navigating to delete item with sku:", sku);
		this.router.navigate([`/inventory/delete/${sku}`]);
	}
	isRole(role: string): boolean {
		return this.authService.hasRole(role);
	}
}
