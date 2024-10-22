import React from "react";
import ApexCharts from "react-apexcharts";

const Charts = () => {
	const options = {
		chart: {
			type: "line",
			zoom: {
				enabled: false,
			},
			background: "transparent",
		},
		theme: {
			mode: "dark",
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: "straight",
			colors: ["#000524"],
		},
		title: {
			text: "LEITURAS DO SENSOR",
			align: "center",
		},
		xaxis: {
			categories: [
				"12:00",
				"13:00",
				"14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
                "20:00"
			],
		},
	};

	const series = [
		{
			name: "Temperatura",
			data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
		},
	];

	return (
		<ApexCharts
			options={options}
			series={series}
			type="line"
			width="220%"
			height="190%"
		/>
	);
};

export default Charts;
