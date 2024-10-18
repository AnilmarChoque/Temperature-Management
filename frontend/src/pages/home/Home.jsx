import React from "react";
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
	});

	const sensores = data?.sensoresPorEmpresa || [];

	return (
		<div className="home">
			<p className="titulo-home">GERENCIAMENTO DE TEMPERATURA</p>
			<section className="menu-bar">
				<Perfil nomeUsuario={authData?.login.nome} />
				<SearchBar size="40%" backgroundColor="#101F78" />
			</section>
			<section className="background-sensor">
				<div className="menu-sensor">
					{sensores.length === 0 ? (
						<p className="aviso">Nenhum sensor cadastrado</p>
					) : (
						sensores.map((sensor) => (
							<SensorCard
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
