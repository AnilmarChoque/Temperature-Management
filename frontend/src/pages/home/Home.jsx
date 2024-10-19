import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Home.css";
import Perfil from "../../components/Perfil";
import SearchBar from "../../components/SearchBar";
import SensorCard from "../../components/SensorCard";
import { gql, useQuery } from "@apollo/client";

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
		pollInterval: 5000,
	});

	const [filteredSensors, setFilteredSensors] = useState(null);

	const sensores = data?.sensoresPorEmpresa || [];

	const handleSearch = (searchTerm) => {
		if (searchTerm) {
			// Filtrar sensores com base na pesquisa
			const filtered = sensores.filter(sensor =>
				sensor.equipmentId.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setFilteredSensors(filtered);
		} else {
			// Se a busca estiver vazia, redefina a lista de sensores filtrados para null
			setFilteredSensors(null);
		}
	};

	const noResults = filteredSensors !== null && filteredSensors.length === 0;
	
	const sensorsToDisplay = filteredSensors != null ? filteredSensors : sensores;

	return (
		<div className="home">
			<p className="titulo-home">GERENCIAMENTO DE TEMPERATURA</p>
			<section className="menu-bar">
				<Perfil nomeUsuario={authData?.login.nome} />
				<SearchBar size="40%" backgroundColor="#101F78" onSearch={handleSearch}/>
			</section>
			<section className="background-sensor">
				<div className="menu-sensor">
					{noResults ? (
						<p className="aviso">Nenhum sensor encontrado</p>
					) : sensorsToDisplay.length === 0 ? (
						<p className="aviso">Nenhum sensor cadastrado</p>
					) : (
						sensorsToDisplay.map((sensor) => (
							<SensorCard
								key={sensor.idSensor}
								identificador={sensor.equipmentId}
								dataSensor={sensor.timestamp}
								temperaturaSensor={sensor.value}
								idSensor={sensor.idSensor}
							/>
						))
					)}
				</div>
			</section>
		</div>
	);
};

export default Home;
