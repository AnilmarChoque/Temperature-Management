import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Home.css";
import Perfil from "../../components/Perfil";
import SearchBar from "../../components/SearchBar";
import SensorCard from "../../components/SensorCard";
import { gql, useQuery, useApolloClient } from "@apollo/client";

const GET_SENSORES = gql`
	query GetSensores($idEmpresa: ID!) {
		sensoresPorEmpresa(idEmpresa: $idEmpresa) {
			idSensor
			equipmentId
		}
	}
`;

const GET_DADOS = gql`
	query getDados($idSensor: ID!) {
		ultimosDados(idSensor: $idSensor) {
			idDados
			timestamp
			value
		}
	}
`

const Home = () => {
	const location = useLocation();
	const client = useApolloClient();
	const { data: authData } = location.state;

	const { data, loading, error } = useQuery(GET_SENSORES, {
		variables: { idEmpresa: authData.login.idEmpresa },
		pollInterval: 5000,
	});

	const [filteredSensors, setFilteredSensors] = useState(null);
	const [sensorData, setSensorData] = useState({});
	const sensores = data?.sensoresPorEmpresa || [];

	useEffect(() => {
		if (!loading && sensores.length > 0) {
			const fetchData = async () => {
				const fetchedData = {};
				for (const sensor of sensores) {
					const { data: dadosSensorData } = await client.query({
						query: GET_DADOS,
						variables: { idSensor: sensor.idSensor },
					});
					fetchedData[sensor.idSensor] = dadosSensorData?.ultimosDados;
				}
				setSensorData(fetchedData);
			};

			fetchData();
		}
	}, [sensores, loading]);


	const handleSearch = (searchTerm) => {
		if (searchTerm) {
			const filtered = sensores.filter(sensor =>
				sensor.equipmentId.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setFilteredSensors(filtered);
		} else {
			setFilteredSensors(null);
		}
	};

	const noResults = filteredSensors !== null && filteredSensors.length === 0;
	const sensorsToDisplay = filteredSensors != null ? filteredSensors : sensores;

	if (loading) return <p>Carregando sensores...</p>;
	if (error) return <p>Erro ao carregar sensores: {error.message}</p>;

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
						sensorsToDisplay.map((sensor) => {
							const ultimoDado = sensorData[sensor.idSensor];

							return (
								<SensorCard
									key={sensor.idSensor}
									identificador={sensor.equipmentId}
									dataSensor={ultimoDado?.timestamp || "N/A"}
									temperaturaSensor={ultimoDado?.value || "N/A"}
									idSensor={sensor.idSensor}
									dados={authData}
								/>
							);
						})
					)}
				</div>
			</section>
		</div>
	);
};

export default Home;
