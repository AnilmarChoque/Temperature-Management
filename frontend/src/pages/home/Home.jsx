import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Home.css";
import Perfil from "../../components/Perfil";
import SearchBar from "../../components/SearchBar";
import SensorCard from "../../components/SensorCard";
import { gql, useQuery } from "@apollo/client";
import { handleError } from "@apollo/client/link/http/parseAndCheckHttpResponse";

const GET_SENSORES = gql`
	query GetSensores($idEmpresa: ID!) {
		sensoresPorEmpresa(idEmpresa: $idEmpresa) {
			idSensor
			equipmentId
			timestamp
			value
		}
	}
`;

const Home = () => {
	const location = useLocation();
	const { data: authData } = location.state;

	const { loading, error, data } = useQuery(GET_SENSORES, {
		variables: { idEmpresa: authData.login.idEmpresa },
	});

	const [filteredSensors, setFilteredSensors] = useState([]);

	const sensores = data?.sensoresPorEmpresa || [];

	const handleSearch = (searchTerm) => {
		const filtered = sensores.filter(sensor =>
			sensor.equipmentId.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredSensors(filtered);
	};

	const sensorsToDisplay = filteredSensors.length > 0 ? filteredSensors : sensores;

	return (
		<div className="home">
			<p className="titulo-home">GERENCIAMENTO DE TEMPERATURA</p>
			<section className="menu-bar">
				<Perfil nomeUsuario={authData?.login.nome} />
				<SearchBar size="40%" backgroundColor="#101F78" onSearch={handleSearch}/>
			</section>
			<section className="background-sensor">
				<div className="menu-sensor">
					{sensorsToDisplay.length === 0 ? (
						<p className="aviso">Nenhum sensor cadastrado</p>
					) : (
						sensorsToDisplay.map((sensor) => (
							<SensorCard
								key={sensor.idSensor}
								identificador={sensor.equipmentId}
								dataSensor={sensor.timestamp}
								temperaturaSensor={sensor.value}
							/>
						))
					)}
				</div>
			</section>
		</div>
	);
};

export default Home;
