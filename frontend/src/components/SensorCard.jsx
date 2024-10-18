import React from "react";
import "../pages/home/Home.css";

const SensorCard = ({ identificador, dataSensor, horaSensor , temperaturaSensor}) => {

    const getDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const getHour = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        return `${hours}:${minutes}:${seconds}`
    }
    
	const infoSensor = {
		id: identificador,
		data: dataSensor || getDate(),
        hora: horaSensor || getHour(),
        temperatura: temperaturaSensor
	};

	return (
		<div className="card-sensor">
			<p>{infoSensor.id}</p>
			<div className="dados-sensor">
				<p>Data e hora da última captura</p>
				<div>
					<p>{infoSensor.data}</p>
					<p>{infoSensor.hora}</p>
				</div>
			</div>
			<div className="dados-sensor">
				<p>Temperatura Atual</p>
				<div>
					<p>{infoSensor.temperatura}</p>
				</div>
			</div>
			<button>Ver Mais</button>
		</div>
	);
};

export default SensorCard;
