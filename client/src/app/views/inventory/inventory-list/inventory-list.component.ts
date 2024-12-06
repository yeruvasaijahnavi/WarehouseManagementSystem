import { Component, inject, OnInit } from "@angular/core";
import { InventoryService } from "../../../services/inventory.service";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
@Component({
	selector: "app-inventory-list",
	imports: [CommonModule],
	templateUrl: "./inventory-list.component.html",
	styleUrl: "./inventory-list.component.scss",
})
export class InventoryListComponent implements OnInit {
	inventoryList: any[] = [];
	inventoryService = inject(InventoryService);
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
}
