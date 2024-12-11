import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StaffService } from "src/app/services/staff.service";

@Component({
	selector: "app-staff-view",
	templateUrl: "./staff-view.component.html",
	styleUrls: ["./staff-view.component.scss"],
	imports: [CommonModule],
})
export class StaffViewComponent implements OnInit {
	staff: any = null; // To hold the staff details

	constructor(
		private route: ActivatedRoute,
		private staffService: StaffService
	) {}

	ngOnInit(): void {
		// Get the staffId from the URL (route parameter)
		const staffId = this.route.snapshot.paramMap.get("id");
		if (staffId) {
			this.fetchStaffDetails(staffId); // Fetch staff details when the component initializes
		}
	}

	fetchStaffDetails(staffId: string): void {
		// Call the service to get the staff details by ID
		this.staffService.getStaffMembers().subscribe({
			next: (data) => {
				// Find the staff member with the matching ID
				this.staff = data.find((staff) => staff.staffId === staffId);
			},
			error: (err) => {
				console.error("Error fetching staff details:", err);
			},
		});
	}
}
