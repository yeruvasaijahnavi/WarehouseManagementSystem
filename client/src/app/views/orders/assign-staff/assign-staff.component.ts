import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OrderService } from "src/app/services/order.service";
import { StaffService } from "src/app/services/staff.service";

@Component({
	selector: "app-assign-staff",
	templateUrl: "./assign-staff.component.html",
	styleUrls: ["./assign-staff.component.scss"],
	imports: [CommonModule, FormsModule],
})
export class AssignStaffComponent implements OnInit {
	staffList: any[] = [];
	selectedStaffId: string = "";
	orderId: string = "";

	constructor(
		private staffService: StaffService,
		private orderService: OrderService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.orderId = this.route.snapshot.paramMap.get("id")!;
		this.staffService.getStaffMembers().subscribe((staff) => {
			this.staffList = staff;
		});
	}

	assignStaff(): void {
		this.orderService
			.assignStaff(this.orderId, this.selectedStaffId)
			.subscribe({
				next: () => {
					alert("Staff assigned successfully!");
					this.router.navigate(["/orders"]);
				},
				error: (err: any) => {
					console.error("Error assigning staff:", err);
				},
			});
	}
}
