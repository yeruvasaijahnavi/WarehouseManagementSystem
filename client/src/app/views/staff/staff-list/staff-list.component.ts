import { Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StaffService } from "../../../services/staff.service";
import { CommonModule } from "@angular/common";
import { TableModule } from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";

@Component({
	selector: "app-staff-list",
	templateUrl: "./staff-list.component.html",
	styleUrls: ["./staff-list.component.scss"],
	imports: [CommonModule, TableModule, IconDirective],
})
export class StaffListComponent implements OnInit {
	staffList: any[] = [];

	router = inject(Router);
	staffService = inject(StaffService);

	ngOnInit(): void {
		this.fetchStaffMembers();
	}

	fetchStaffMembers(): void {
		this.staffService.getStaffMembers().subscribe({
			next: (data) => {
				this.staffList = data;
			},
			error: (err) => console.error("Error fetching staff members:", err),
		});
	}

	viewStaffDetails(staffId: string) {
		this.router.navigate(["/staff/details", staffId]);
	}
}
