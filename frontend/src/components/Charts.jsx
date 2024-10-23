import React from "react";
import ApexCharts from "react-apexcharts";

const Charts = ({ dadosSensor }) => {
    const ultimosDados = dadosSensor.slice(-8);

	let cont = ultimosDados.length;
	const seriesData = ultimosDados.map((dados) => {
		const timestamp = Number(dados.timestamp);

		return {
			x: new Date(timestamp).getTime(),
			y: dados.value,
		};
	});

	const options = {
		chart: {
			type: "line",
			zoom: {
				enabled: true, 
			},
			background: "transparent",
		},
		theme: {
			mode: "dark",
		},
		stroke: {
			curve: "straight",
			colors: ["#000524"],
		},
		title: {
			text: "LEITURAS DO SENSOR",
			align: "center",
		},
		yaxis: {
			min: 0,
		},
		markers: {
			size: 5,
			colors: "#000524",
			strokeColors: "#000524",
			strokeWidth: 3,
		},
		xaxis: {
			type: "datetime",
			tickAmount: cont - 2,
			labels: {
				datetimeUTC: true,
				formatter: function (value) {
					const date = new Date(value);
					const options = { 
                        month: "2-digit", 
                        day: "2-digit", 
                        hour: "2-digit", 
                        minute: "2-digit", 
                        hour12: false 
                    };
					return date.toLocaleTimeString([], options);
				},
			},
		},
	};

	const series = [
		{
			name: "Temperatura",
			data: seriesData,
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
