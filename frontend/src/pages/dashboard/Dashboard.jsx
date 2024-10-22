import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { gql, useQuery, useApolloClient } from "@apollo/client";
import "./Dashboard.css";
import Perfil from "../../components/Perfil";
import Back from "../../assets/back.png";
import fotoPerfil from "../../assets/profile-user.png";
import SearchBar from "../../components/SearchBar";
import search from "../../assets/search.png";
import MiniCard from "../../components/MiniCard";
import Charts from "../../components/Charts";

const GET_SENSOR = gql`
	query GetSensor($idSensor: ID!) {
		getSensor(idSensor: $idSensor) {
			idSensor
			equipmentId
		}
	}
`;

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
			value
			timestamp
		}
	}
`;

const Dashboard = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const client = useApolloClient();
	const { usuarioDados } = location.state;

	const { loading, error, data } = useQuery(GET_SENSOR, {
		variables: { idSensor: id },
	});

	const { data: sensoresData } = useQuery(GET_SENSORES, {
		variables: { idEmpresa: usuarioDados.login.idEmpresa },
		pollInterval: 5000,
	});

	const [filteredSensors, setFilteredSensors] = useState(null);
	const [sensorData, setSensorData] = useState({});

	const sensores = sensoresData?.sensoresPorEmpresa || [];

	useEffect(() => {
		if (!loading && sensores.length > 0) {
			const fetchData = async () => {
				const fetchedData = {};
				for (const sensor of sensores) {
					const { data: dadosSensorData } = await client.query({
						query: GET_DADOS,
						variables: { idSensor: sensor.idSensor },
						fetchPolicy: "no-cache",
					});
					fetchedData[sensor.idSensor] = dadosSensorData?.ultimosDados;
				}
				setSensorData(fetchedData);
			};

			fetchData();
			const intervalId = setInterval(() => {
				if (!loading && sensores.length > 0) {
					console.log("Fetching data...");
					fetchData();
				}
			}, 5000);

			return () => clearInterval(intervalId);
		}
	}, [sensores, loading]);

	const handleSearch = (searchTerm) => {
		if (searchTerm) {
			const filtered = sensores.filter((sensor) =>
				sensor.equipmentId.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setFilteredSensors(filtered);
		} else {
			setFilteredSensors(null);
		}
	};

	const handleBackPage = () => {
		navigate(`/home`, { state: { data: usuarioDados } });
	};

	const noResults = filteredSensors !== null && filteredSensors.length === 0;

	const sensorsToDisplay = filteredSensors != null ? filteredSensors : sensores;

	if (loading) return <p>Carregando...</p>;
	if (error) return <p>Erro ao carregar o sensor</p>;

	const { equipmentId } = data.getSensor;

	return (
		<div className="dashboard">
			<section className="menu-lateral">
				<div className="div-button">
					<button className="botao-voltar" onClick={handleBackPage}>
						<img src={Back} alt="<" />
					</button>
				</div>

				<Perfil
					nomeUsuario={usuarioDados?.login.nome}
					profileUser={fotoPerfil}
					position="relative"
					size="50%"
					left="0"
				/>
				<div className="div-search">
					<SearchBar
						backgroundColor="#000524"
						lupa={search}
						size="90%"
						onSearch={handleSearch}
					/>
				</div>

				<div className="menu-cards">
					{noResults ? (
						<p className="aviso">Nenhum sensor encontrado</p>
					) : sensorsToDisplay.length === 0 ? (
						<p className="aviso">Nenhum sensor cadastrado</p>
					) : (
						sensorsToDisplay.map((sensor) => {
							const ultimoDado = sensorData[sensor.idSensor];

							return (
								<MiniCard
									key={sensor.idSensor}
									identificador={sensor.equipmentId}
									temperaturaSensor={ultimoDado?.value || "N/A"}
									idSensor={sensor.idSensor}
									dados={usuarioDados}
								/>
							);
						})
					)}
				</div>
			</section>
			<section className="menu-dashboard">
				<p className="titulo-dashboard">EQUIPAMENTO: {equipmentId}</p>
				<div className="grafico-csv">
					<div className="grafico">
						<div>
							<Charts />
						</div>
					</div>
					<div className="arquivo-csv">
						<p>Problemas com dados incompletos?</p>
						<p>Envie um arquivo .CSV</p>
						<label className="file">
							Clique aqui para enviar
							<input type="file" accept=".csv" />
						</label>
					</div>
				</div>
				<div className="titulo-legenda">
					<div className="titulo">
						<p>Média de Temperatura</p>
					</div>
					<div className="legenda">
						<p className="titulo-legenda">Legenda:</p>
						<div className="container-bom">
							<div className="bom"></div>
							<p>Bom</p>
						</div>
						<div className="container-neutro">
							<div className="neutro"></div>
							<p>Neutro</p>
						</div>
						<div className="container-ruim">
							<div className="ruim"></div>
							<p>Ruim</p>
						</div>
					</div>
				</div>
				<div className="medias">
					<div className="dia">
						<p className="titulo-media">Últimas 24 horas</p>
						<p className="temperatura-dia">53.72°C</p>
					</div>
					<div className="dias">
						<p className="titulo-media">Últimas 48 horas</p>
						<p className="temperatura-dias">78.24°C</p>
					</div>
					<div className="semana">
						<p className="titulo-media">Última Semana</p>
						<p className="temperatura-semana">103.57°C</p>
					</div>
					<div className="mes">
						<p className="titulo-media">Último Mês</p>
						<p className="temperatura-mes">84.43°C</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Dashboard;
