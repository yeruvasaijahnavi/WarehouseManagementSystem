import { Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StaffService } from "../../../services/staff.service";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-staff-list",
	templateUrl: "./staff-list.component.html",
	styleUrls: ["./staff-list.component.scss"],
	imports: [CommonModule],
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
