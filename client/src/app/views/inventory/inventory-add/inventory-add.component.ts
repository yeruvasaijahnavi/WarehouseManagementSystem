import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { InventoryService } from "../../../services/inventory.service";
import { FormsModule } from "@angular/forms";

@Component({
	selector: "app-inventory-add",
	templateUrl: "./inventory-add.component.html",
	styleUrls: ["./inventory-add.component.scss"],
	imports: [FormsModule],
})
export class InventoryAddComponent implements OnInit {
	newItem = {
		sku: "",
		name: "",
		category: "",
		description: "",
		quantity: 0,
		price: 0,
		location: "",
	};

	constructor(
		private inventoryService: InventoryService,
		private router: Router
	) {}

	ngOnInit(): void {}

	// Method to add inventory item
	addInventoryItem() {
		this.inventoryService.addInventoryItem(this.newItem).subscribe(
			(response) => {
				console.log("Item added successfully:", response);
				this.router.navigate(["/inventory"]); // Redirect to inventory list page after adding
			},
			(error) => {
				console.error("Error adding item:", error);
			}
		);
	}
}
