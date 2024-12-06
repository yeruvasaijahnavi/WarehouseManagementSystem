import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { InventoryService } from "../../../services/inventory.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
	selector: "app-inventory-update",
	templateUrl: "./inventory-update.component.html",
	styleUrls: ["./inventory-update.component.scss"],
	imports: [CommonModule, FormsModule],
})
export class InventoryUpdateComponent implements OnInit {
	inventoryItem: any = {};
	errorMessage: string = "";
	sku: string | null = null;

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

	updateInventoryItem(): void {
		if (this.sku) {
			this.inventoryService
				.updateInventoryItem(this.sku, this.inventoryItem)
				.subscribe({
					next: (updatedItem: any) => {
						console.log("Item updated successfully:", updatedItem);
						this.router.navigate(["/inventory"]);
					},
					error: (error: any) => {
						console.error("Error updating item:", error);
						this.errorMessage = "Failed to update the item.";
					},
				});
		}
	}
}
