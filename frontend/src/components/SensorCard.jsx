import React from "react";
import "../pages/home/Home.css";

const SensorCard = ({ identificador, dataSensor, temperaturaSensor}) => {
    
	const infoSensor = {
		id: identificador,
		data: dataSensor,
        temperatura: temperaturaSensor
	};

    const timestamp = Number(dataSensor);

    const formattedDate = new Date(timestamp).toLocaleString('pt-BR', {
		timeZone: 'America/Sao_Paulo',
	});

	return (
		<div className="card-sensor">
			<p>{infoSensor.id}</p>
			<div className="dados-sensor">
				<p>Data e hora da última captura</p>
				<div>
                    <p>{formattedDate.split(',')[0]}</p>
                    <p>{formattedDate.split(',')[1]}</p>
				</div>
			</div>
			<div className="dados-sensor">
				<p>Temperatura Atual</p>
				<div>
					<p>{infoSensor.temperatura}°C</p>
				</div>
			</div>
			<button>Ver Mais</button>
		</div>
	);
};

export default SensorCard;
