import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InventoryService } from "../../../services/inventory.service";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-inventory-view",
	templateUrl: "./inventory-view.component.html",
	// styleUrls: ["./inventory-view.component.scss"],
	imports: [CommonModule],
})
export class InventoryViewComponent implements OnInit {
	inventoryItem: any = null;
	errorMessage: string = "";

	constructor(
		private route: ActivatedRoute,
		private inventoryService: InventoryService
	) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
			const sku = params.get("sku");
			if (sku) {
				this.loadItemBySku(sku);
			} else {
				this.errorMessage = "No SKU provided";
			}
		});
	}

	loadItemBySku(sku: string): void {
		this.inventoryService.getInventoryItemBySKU(sku).subscribe(
			(item: any) => {
				this.inventoryItem = item;
				console.log("Loaded item:", this.inventoryItem);
			},
			(error: any) => {
				console.error("Error loading item:", error);
				this.errorMessage = "Failed to load the item.";
			}
		);
	}
}
