import React from "react";
import "../pages/dashboard/Dashboard.css";
import { useNavigate } from "react-router-dom";

const MiniCard = ({
	identificador,
	temperaturaSensor,
	idSensor,
	dados,
}) => {
	const navigate = useNavigate();

	const handleViewMore = () => {
		navigate(`/sensor/${idSensor}`, { state: { usuarioDados: dados } });
	};

	const infoSensor = {
		id: identificador,
		temperatura: temperaturaSensor,
	};

	return (
		<button onClick={handleViewMore} className="card-sensor-lateral">
			<div className="card-sensor-titulo">
				<p>{infoSensor.id}</p>
			</div>

			<div className="card-sensor-valor">
				<p>Valor</p>
				<p>{infoSensor.temperatura}°C</p>
			</div>
		</button>
	);
};

export default MiniCard;
