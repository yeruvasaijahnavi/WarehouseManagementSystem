import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { InventoryService } from "../../../services/inventory.service";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-inventory-delete",
	templateUrl: "./inventory-delete.component.html",
	styleUrls: ["./inventory-delete.component.scss"],
	imports: [CommonModule],
})
export class InventoryDeleteComponent implements OnInit {
	sku: string | null = null;
	inventoryItem: any = null;
	errorMessage: string = "";

	inventoryService = inject(InventoryService);
	router = inject(Router);
	route = inject(ActivatedRoute);

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
			this.sku = params.get("sku");
			if (this.sku) {
				this.loadItemBySku(this.sku);
			} else {
				this.errorMessage = "No SKU provided";
			}
		});
	}

	loadItemBySku(sku: string): void {
		this.inventoryService.getInventoryItemBySKU(sku).subscribe(
			(item: any) => {
				this.inventoryItem = item;
			},
			(error: any) => {
				console.error("Error loading item:", error);
				this.errorMessage = "Failed to load the item.";
			}
		);
	}

	deleteInventoryItem(): void {
		if (this.sku) {
			this.inventoryService.deleteInventoryItem(this.sku).subscribe(
				() => {
					console.log("Item deleted successfully");
					this.router.navigate(["/inventory"]);
				},
				(error: any) => {
					console.error("Error deleting item:", error);
					this.errorMessage = "Failed to delete the item.";
				}
			);
		}
	}

	cancel(): void {
		this.router.navigate(["/inventory"]);
	}
}
