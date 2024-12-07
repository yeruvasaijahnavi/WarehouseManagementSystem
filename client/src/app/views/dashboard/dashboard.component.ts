import { CommonModule, DOCUMENT, NgStyle } from "@angular/common";
import {
	Component,
	DestroyRef,
	effect,
	inject,
	OnInit,
	Renderer2,
	signal,
	WritableSignal,
} from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ChartOptions } from "chart.js";
import {
	AvatarComponent,
	ButtonDirective,
	ButtonGroupComponent,
	CardBodyComponent,
	CardComponent,
	CardFooterComponent,
	CardHeaderComponent,
	ColComponent,
	FormCheckLabelDirective,
	GutterDirective,
	ProgressBarDirective,
	ProgressComponent,
	RowComponent,
	TableDirective,
	TextColorDirective,
} from "@coreui/angular";
import { ChartjsComponent, ChartjsModule } from "@coreui/angular-chartjs";
import {
	IconDirective,
	IconModule,
	IconSetService,
} from "@coreui/icons-angular";
import { DashboardService } from "../../services/dashboard.service";
import { WidgetsBrandComponent } from "../widgets/widgets-brand/widgets-brand.component";
import { WidgetsDropdownComponent } from "../widgets/widgets-dropdown/widgets-dropdown.component";
import { DashboardChartsData, IChartProps } from "./dashboard-charts-data";
import {
	DropdownModule,
	ProgressModule,
	SharedModule,
	WidgetModule,
} from "@coreui/angular";

import { cilInbox } from "@coreui/icons";

interface IUser {
	name: string;
	state: string;
	registered: string;
	country: string;
	usage: number;
	period: string;
	payment: string;
	activity: string;
	avatar: string;
	status: string;
	color: string;
}

@Component({
	templateUrl: "dashboard.component.html",
	styleUrls: ["dashboard.component.scss"],
	imports: [
		WidgetsDropdownComponent,
		TextColorDirective,
		CardComponent,
		CardBodyComponent,
		RowComponent,
		ColComponent,
		ButtonDirective,
		IconDirective,
		ReactiveFormsModule,
		ButtonGroupComponent,
		FormCheckLabelDirective,
		ChartjsComponent,
		NgStyle,
		CardFooterComponent,
		GutterDirective,
		ProgressBarDirective,
		ProgressComponent,
		WidgetsBrandComponent,
		CardHeaderComponent,
		TableDirective,
		AvatarComponent,
		DropdownModule,
		ProgressModule,
		SharedModule,
		IconModule,
		ChartjsModule,
		WidgetModule,
		CommonModule,
	],
})
export class DashboardComponent implements OnInit {
	readonly #destroyRef: DestroyRef = inject(DestroyRef);
	readonly #document: Document = inject(DOCUMENT);
	readonly #renderer: Renderer2 = inject(Renderer2);
	readonly #chartsData: DashboardChartsData = inject(DashboardChartsData);

	public users: IUser[] = [
		{
			name: "Yiorgos Avraamu",
			state: "New",
			registered: "Jan 1, 2021",
			country: "Us",
			usage: 50,
			period: "Jun 11, 2021 - Jul 10, 2021",
			payment: "Mastercard",
			activity: "10 sec ago",
			avatar: "./assets/images/avatars/1.jpg",
			status: "success",
			color: "success",
		},
		{
			name: "Avram Tarasios",
			state: "Recurring ",
			registered: "Jan 1, 2021",
			country: "Br",
			usage: 10,
			period: "Jun 11, 2021 - Jul 10, 2021",
			payment: "Visa",
			activity: "5 minutes ago",
			avatar: "./assets/images/avatars/2.jpg",
			status: "danger",
			color: "info",
		},
		{
			name: "Quintin Ed",
			state: "New",
			registered: "Jan 1, 2021",
			country: "In",
			usage: 74,
			period: "Jun 11, 2021 - Jul 10, 2021",
			payment: "Stripe",
			activity: "1 hour ago",
			avatar: "./assets/images/avatars/3.jpg",
			status: "warning",
			color: "warning",
		},
		{
			name: "Enéas Kwadwo",
			state: "Sleep",
			registered: "Jan 1, 2021",
			country: "Fr",
			usage: 98,
			period: "Jun 11, 2021 - Jul 10, 2021",
			payment: "Paypal",
			activity: "Last month",
			avatar: "./assets/images/avatars/4.jpg",
			status: "secondary",
			color: "danger",
		},
		{
			name: "Agapetus Tadeáš",
			state: "New",
			registered: "Jan 1, 2021",
			country: "Es",
			usage: 22,
			period: "Jun 11, 2021 - Jul 10, 2021",
			payment: "ApplePay",
			activity: "Last week",
			avatar: "./assets/images/avatars/5.jpg",
			status: "success",
			color: "primary",
		},
		{
			name: "Friderik Dávid",
			state: "New",
			registered: "Jan 1, 2021",
			country: "Pl",
			usage: 43,
			period: "Jun 11, 2021 - Jul 10, 2021",
			payment: "Amex",
			activity: "Yesterday",
			avatar: "./assets/images/avatars/6.jpg",
			status: "info",
			color: "dark",
		},
	];

	public mainChart: IChartProps = { type: "line" };
	public mainChartRef: WritableSignal<any> = signal(undefined);
	#mainChartRefEffect = effect(() => {
		if (this.mainChartRef()) {
			this.setChartStyles();
		}
	});
	public chart: Array<IChartProps> = [];
	public trafficRadioGroup = new FormGroup({
		trafficRadio: new FormControl("Month"),
	});

	public totalInventoryValue: number | null = null;
	public totalInventoryQuantity: number | null = null;
	public loading = true; // For a loading indicator
	icons = { cilInbox };
	constructor(private dashboardService: DashboardService) {}
	ngOnInit(): void {
		this.initCharts();
		this.updateChartOnColorModeChange();
		this.fetchInventoryTotalValue();
		this.fetchInventoryTotalQuantity();
	}
	fetchInventoryTotalValue(): void {
		this.dashboardService.getInventoryTotalValue().subscribe({
			next: (data: any) => {
				// Access the first element of the array and then get totalValue
				if (data && data.length > 0) {
					this.totalInventoryValue = data[0].totalValue;
					console.log(
						"Total inventory value:",
						this.totalInventoryValue
					);
				} else {
					console.log("No data found");
					this.totalInventoryValue = 0; // Handle no data case
				}
				this.loading = false;
			},
			error: (err) => {
				console.error("Error fetching inventory total value:", err);
				this.loading = false;
			},
		});
	}

	fetchInventoryTotalQuantity(): void {
		this.dashboardService.getInventoryTotalQuantity().subscribe({
			next: (data: any) => {
				if (data && data.length > 0) {
					this.totalInventoryQuantity = data[0].totalQuantity;
				} else {
					this.totalInventoryQuantity = 0;
				}
			},
			error: (err) => {
				console.error("Error fetching inventory total quantity:", err);
			},
		});
	}
	initCharts(): void {
		this.mainChart = this.#chartsData.mainChart;
	}

	setTrafficPeriod(value: string): void {
		this.trafficRadioGroup.setValue({ trafficRadio: value });
		this.#chartsData.initMainChart(value);
		this.initCharts();
	}

	handleChartRef($chartRef: any) {
		if ($chartRef) {
			this.mainChartRef.set($chartRef);
		}
	}

	updateChartOnColorModeChange() {
		const unListen = this.#renderer.listen(
			this.#document.documentElement,
			"ColorSchemeChange",
			() => {
				this.setChartStyles();
			}
		);

		this.#destroyRef.onDestroy(() => {
			unListen();
		});
	}

	setChartStyles() {
		if (this.mainChartRef()) {
			setTimeout(() => {
				const options: ChartOptions = { ...this.mainChart.options };
				const scales = this.#chartsData.getScales();
				this.mainChartRef().options.scales = {
					...options.scales,
					...scales,
				};
				this.mainChartRef().update();
			});
		}
	}
}
