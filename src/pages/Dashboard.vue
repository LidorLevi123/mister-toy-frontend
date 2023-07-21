<template>
	<section class="dashboard">
		<h1>Prices Per Label</h1>
		<DoughnutChart :chartData="pricesData" />

		<h1>Inventory in stock percentages by Label</h1>
		<PieChart :chartData="inventoryData" />
		<!-- <BarChart :chartData="pricesPerLabel" /> -->
	</section>
</template>
  
<script lang="ts">
import { DoughnutChart } from 'vue-chart-3';
import { BarChart } from 'vue-chart-3';
import { PieChart } from 'vue-chart-3';

import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
	data() {
		return {
			pricesData: {
				labels: ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered'],

				datasets: [
					{
						data: [0, 0, 0, 0, 0, 0, 0, 0],
						backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED', '#ABC6FF', '#0B793F', '#321E6F'],
					},
				],
			},

			inventoryData: {
				labels: ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered'],

				datasets: [
					{
						data: [0, 0, 0, 0, 0, 0, 0, 0],
						backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED', '#ABC6FF', '#0B793F', '#321E6F'],
					},
				],
			}
		}
	},

	created() {
		setTimeout(() => {
			this.setPricesChart()
			this.setInventoryChart()
		}, 500)
	},

	methods: {
		setPricesChart() {
			const toys = this.$store.getters.toys
			const labels = this.pricesData.labels
			const prices = this.pricesData.datasets[0].data

			toys.forEach(toy => {
				toy.labels.forEach(toyLabel => {
					if (labels.includes(toyLabel.title)) {
						const idx = labels.findIndex(label => label === toyLabel.title)
						prices[idx] += toy.price
					}
				})
			})
		},
		setInventoryChart() {
			const toys = this.$store.getters.toys
			const labels = this.inventoryData.labels
			const percentages = this.inventoryData.datasets[0].data

			const inStockCount = toys.reduce((count, toy) => toy.inStock ? count+1 : count, 0)
			toys.reduce((map, toy) => {
				if (toy.inStock) {
					toy.labels.forEach(toyLabel => {
						if (map[toyLabel.title] === undefined) map[toyLabel.title] = 1
						else map[toyLabel.title]++

						if(toy.inStock) {
							const idx = labels.findIndex(label => label === toyLabel.title)
							percentages[idx] = (map[toyLabel.title] * 100) / inStockCount
							percentages[idx] = parseInt(percentages[idx])
						}
					})
				}
				return map
			}, {})
		}
		// 2 Doll
		// 1 BP
		// 1 Water
		// 2*100 / 4
	},

	components: {
		DoughnutChart,
		BarChart,
		PieChart
	},

	name: 'Home',
};
</script>