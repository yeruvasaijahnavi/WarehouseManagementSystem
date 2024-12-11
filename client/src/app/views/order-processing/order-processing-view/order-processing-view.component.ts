import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ProgressComponent, ProgressStackedComponent } from "@coreui/angular";
import { OrderProcessingService } from "src/app/services/order-processing.service";

@Component({
	selector: "order-processing-view",
	imports: [
		CommonModule,
		ProgressComponent,
		ProgressStackedComponent,
		FormsModule,
	],
	templateUrl: "./order-processing-view.component.html",
	styleUrls: ["./order-processing-view.component.scss"],
})
export class OrderProcessingViewComponent {
	order: any = null;
	auditLogs: any[] = [];
	statuses: string[] = [
		"pending",
		"assigned",
		"packed",
		"shipped",
		"delivered",
	];
	currStatus = "pending";
	progressValue = 0;
	startCountdown = false; // Property to track checkbox state
	private intervalId: any;

	constructor(
		private route: ActivatedRoute,
		private orderProcessingService: OrderProcessingService
	) {}

	ngOnInit(): void {
		const orderId = this.route.snapshot.paramMap.get("id");
		if (orderId) {
			this.fetchOrderDetails(orderId);
			this.currStatus = this.order.status;
		}
	}

	fetchOrderDetails(orderId: string): void {
		this.orderProcessingService.getOrderDetails(orderId).subscribe({
			next: (data) => {
				this.order = data.order;
				this.auditLogs = data.auditLogs;
				console.log("Order details:", data);
				this.calculateProgressValue();
			},
			error: (err) => {
				console.error("Error fetching order details:", err);
			},
		});
	}

	calculateProgressValue(): number {
		this.progressValue =
			(this.statuses.indexOf(this.order.status) + 1) *
			(100 / this.statuses.length);
		return this.progressValue;
	}

	startProgressUpdate(): void {
		// Start a countdown every 5 seconds
		this.intervalId = setInterval(() => {
			if (this.progressValue < 100) {
				this.progressValue += 20; // Increment by 10 every 5 seconds
			} else {
				clearInterval(this.intervalId); // Stop the countdown once it reaches 100
			}
		}, 5000);
	}

	onCheckboxChange(): void {
		if (this.startCountdown) {
			this.startProgressUpdate(); // Start the progress update when checkbox is checked
		} else {
			this.resetProgress(); // Optionally reset progress when unchecked
		}
	}

	resetProgress(): void {
		// Reset the progress value if the checkbox is unchecked
		this.progressValue = 0;
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
	}

	ngOnDestroy(): void {
		// Clear the interval when the component is destroyed to avoid memory leaks
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
	}
}
